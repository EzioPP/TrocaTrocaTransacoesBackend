import { ImageUseCase } from '@/domain/use-case';
import { PrismaImageRepository } from '@/infra/database/prisma';
import { SharpImageServices } from '@/infra/services/SharpImageServices';

import { PrismaClient } from '@prisma/client';

export function ImageControllerFactory(): ImageUseCase {
  const prisma = new PrismaClient({
    datasources: { db: { url: process.env.IMAGE_DATABASE_URL } },
  });
  const imageRepository = new PrismaImageRepository(prisma);
  const imageServices = new SharpImageServices();
  return new ImageUseCase(imageRepository, imageServices);
}
