import { Pix } from '@/domain/entities';
import { IPixRepository } from '@/domain/repositories/IPixRepository';
import { PixMapper } from '@/infra/mapper/PixMapper';
import { logger } from '@/infra/logger/logger';

import { PrismaClient } from '@prisma/client';

export class PrismaPixRepository implements IPixRepository {
  constructor(private prisma: PrismaClient) {}

  async save(pix: Pix): Promise<Pix | null> {
    try {
      const createdPix = await this.prisma.pix.create({
        data: {
          tipo_chave: pix.keyType,
          id_cliente: pix.clientId,
        },
      });
      return PixMapper.toDomain(createdPix);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findById(pixId: number): Promise<Pix | null> {
    try {
      const pix = await this.prisma.pix.findUnique({
        where: {
          id_pix: pixId,
        },
      });
      if (!pix) return null;
      return PixMapper.toDomain(pix);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findByKey(key: string): Promise<Pix | null> {
    try {
      const pix = await this.prisma.pix.findUnique({
        where: {
          tipo_chave: key,
        },
      });
      if (!pix) return null;
      return PixMapper.toDomain(pix);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findAll(): Promise<Pix[]> {
    try {
      const pixs = await this.prisma.pix.findMany();
      return pixs.map(PixMapper.toDomain);
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  async update(pix: Pix): Promise<Pix | null> {
    try {
      const updatedPix = await this.prisma.pix.update({
        where: {
          id_pix: pix.pixId,
        },
        data: {
          tipo_chave: pix.keyType,
          id_cliente: pix.clientId,
        },
      });
      return PixMapper.toDomain(updatedPix);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async delete(pixId: number): Promise<Pix | null> {
    try {
      const deletedPix = await this.prisma.pix.delete({
        where: {
          id_pix: pixId,
        },
      });
      return PixMapper.toDomain(deletedPix);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
