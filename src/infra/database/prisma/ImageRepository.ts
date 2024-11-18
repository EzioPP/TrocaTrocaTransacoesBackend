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
  constructor(private prisma: PrismaClient) {}

  async findByImageId(imageId: number): Promise<Image | null> {
    try {
      const image = await this.prisma.image.findUnique({
        where: { id_imagem: imageId },
      });
      if (!image) return null;
      return ImageMapper.toDomain(image);
    } catch (error) {
      logger.error('Error finding image by ID: ', error);
      return null;
    }
  }

  async findAll(): Promise<Image[]> {
    try {
      const images = await this.prisma.image.findMany();
      return images.map(ImageMapper.toDomain);
    } catch (error) {
      logger.error('Error finding all images: ', error);
      return [];
    }
  }
  update(image: Image): Promise<Image | null> {
    throw new Error('Method not implemented.');
  }
  delete(imageId: number): Promise<Image | null> {
    throw new Error('Method not implemented.');
  }

  async save(image: Image): Promise<Image | null> {
    try {
      if (image._imagePath) {
        image._imageData = fs.readFileSync(image._imagePath);
      }

      if (!image._imageData) {
        throw new Error('Image data is required');
      }

      const createdImage = await this.prisma.image.create({
        data: {
          imagem: image._imageData,
        },
      });

      return ImageMapper.toDomain(createdImage);
    } catch (error) {
      logger.error('Error saving image: ', error);
      return null;
    }
  }

  async findById(imageId: number): Promise<Image | null> {
    const image = await this.prisma.image.findUnique({
      where: {
        id_imagem: imageId,
      },
    });

    if (!image) return null;

    return new Image(image.id_imagem, image.imagem);
  }
}
