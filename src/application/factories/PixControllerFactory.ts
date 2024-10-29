import { PixUseCase } from '@/domain/use-case';
import { PrismaPixRepository } from '@/infra/database/prisma';

import { PrismaClient } from '@prisma/client';

export function PixControllerFactory(): PixUseCase {
  const prisma = new PrismaClient();
  const pixRepository = new PrismaPixRepository(prisma);
  return new PixUseCase(pixRepository);
}
