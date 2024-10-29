import { PrismaClient } from '@prisma/client';
import { PrismaClientRepository } from '../../infra/database/prisma/ClientRepository';
import { ClientUseCase } from '../../domain/use-case/ClientUseCase';

export function ClientControllerFactory(): ClientUseCase {
  const prisma = new PrismaClient();
  const clientRepository = new PrismaClientRepository(prisma);
  return new ClientUseCase(clientRepository);
}
