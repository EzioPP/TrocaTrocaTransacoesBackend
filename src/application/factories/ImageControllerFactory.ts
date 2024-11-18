import { ImageUseCase } from '@/domain/use-case';
import { PrismaImageRepository } from '@/infra/database/prisma';

import { PrismaClient } from '@prisma/client';

export function ImageControllerFactory(): ImageUseCase {
  const prisma = new PrismaClient({
    datasources: { db: { url: process.env.IMAGE_DATABASE_URL } },
  });
  const reportRepository = new PrismaImageRepository(prisma);
  return new ImageUseCase(reportRepository);
}
