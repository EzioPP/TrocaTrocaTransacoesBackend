import { IImageRepository } from '@/domain/repositories';
import { Image } from '@/domain/entities';
import { ImageMapper } from '@/infra/mapper';
import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { logger } from '@/infra/logger';

/* export class Image {
    _imageId: number;
    _imageData: Buffer; */

export class PrismaImageRepository implements IImageRepository {
  constructor(private prisma: PrismaClient) { }

  async save(image: Image): Promise<Image | null> {

    try {

      const createdImage = await this.prisma.image.create({
        data: {
          titulo: image.title,
          imagem: image.image,
          id_cliente: image.clientId,
        },
      });

      return ImageMapper.toDomain(createdImage);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findByImageId(imageId: number): Promise<Image | null> {
    try {
      const image = await this.prisma.image.findUnique({
        where: {
          id_imagem: imageId,
        },
      });
      if (!image) return null;
      return ImageMapper.toDomain(image);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findByTitle(title: string): Promise<Image | null> {
    try {
      const image = await this.prisma.image.findFirst({
        where: {
          titulo: title,
        },
      });
      if (!image) return null;
      return ImageMapper.toDomain(image);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findAll(): Promise<Image[]> {
    try {
      const images = await this.prisma.image.findMany();
      return images.map(ImageMapper.toDomain);
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  async update(image: Image): Promise<Image | null> {
    try {
      const updatedImage = await this.prisma.image.update({
        where: {
          id_imagem: image.imageId,
        },
        data: {
          titulo: image.title,
          imagem: image.image,
          id_cliente: image.clientId,
        },
      });
      return ImageMapper.toDomain(updatedImage);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async delete(imageId: number): Promise<Image | null> {
    try {
      const image = await this.prisma.image.delete({
        where: {
          id_imagem: imageId,
        },
      });
      return ImageMapper.toDomain(image);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findByClientId(clientId: number): Promise<Image[]> {
    try {
      const images = await this.prisma.image.findMany({
        where: {
          id_cliente: clientId,
        },
      });
      return images.map(ImageMapper.toDomain);
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

}