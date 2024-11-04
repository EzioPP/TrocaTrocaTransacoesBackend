import { TransactionUseCase } from '@/domain/use-case';
import { PrismaTransactionRepository } from '@/infra/database/prisma';

import { PrismaClient } from '@prisma/client';

export function TransactionControllerFactory(): TransactionUseCase {
  const prisma = new PrismaClient();
  const transactionRepository = new PrismaTransactionRepository(prisma);
  return new TransactionUseCase(transactionRepository);
}
