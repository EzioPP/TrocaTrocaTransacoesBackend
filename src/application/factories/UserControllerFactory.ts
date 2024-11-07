import { UserUseCase } from '@/domain/use-case';
import { PrismaUserRepository } from '@/infra/database/prisma';
import { UserServices } from '@/infra/services';

import { PrismaClient } from '@prisma/client';

export function UserControllerFactory(): UserUseCase {
  const prisma = new PrismaClient();
  const userServices = new UserServices();
  const userRepository = new PrismaUserRepository(prisma, userServices);
  return new UserUseCase(userRepository, userServices);
}
