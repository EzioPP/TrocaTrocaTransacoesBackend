import { User } from '@/domain/entities';
import { IUserRepository } from '@/domain/repositories';
import { UserMapper } from '@/infra/mapper';
import { logger } from '../../logger/logger';

import { PrismaClient } from '@prisma/client';
import { IUserServices } from '@/domain/services';

export class UserRepository implements IUserRepository {
  constructor(
    private prisma: PrismaClient,
    private readonly userServices: IUserServices,
  ) {}

  async save(user: User): Promise<User | null> {
    try {
      const encryptedPassword = await this.userServices.encryptPassword(
        user.password,
      );
      const createdUser = await this.prisma.user.create({
        data: {
          username: user.username,
          senha: encryptedPassword,
          id_cliente: user.clientId,
        },
      });
      return UserMapper.toDomain(createdUser);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (!user) return null;
      return UserMapper.toDomain(user);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findById(userId: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id_usuario: userId,
        },
      });
      if (!user) return null;
      return UserMapper.toDomain(user);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany();
      return users.map(UserMapper.toDomain);
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  async update(user: User): Promise<User | null> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id_usuario: user.id,
        },
        data: {
          username: user.username,
          senha: user.password,
          id_cliente: user.clientId,
        },
      });
      return UserMapper.toDomain(updatedUser);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async delete(userId: number): Promise<User | null> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: {
          id_usuario: userId,
        },
      });
      return UserMapper.toDomain(deletedUser);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
