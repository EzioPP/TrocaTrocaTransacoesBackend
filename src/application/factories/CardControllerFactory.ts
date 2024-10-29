import { PrismaCardRepository } from '@/infra/database/prisma/CardRepository';
import { CardUseCase } from '@/domain/use-case';

import { PrismaClient } from '@prisma/client';

export function CardControllerFactory(): CardUseCase {
  const prisma = new PrismaClient();
  const cardRepository = new PrismaCardRepository(prisma);
  return new CardUseCase(cardRepository);
}
