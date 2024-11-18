import { Client } from '@/domain/entities';
import { IClientRepository } from '../../../domain/repositories/IClientRepository';
import { ClientMapper } from '../../mapper/ClientMapper';
import { logger } from '../../logger/logger';

import { PrismaClient } from '@prisma/client';
export class PrismaClientRepository implements IClientRepository {
  constructor(private prisma: PrismaClient) { }

  async save(client: Client): Promise<Client | null> {
    try {
      const createdClient = await this.prisma.client.create({
        data: {
          cpf: client.cpf,
          nome: client.name,
          telefone: client.phone,
          email: client.email,
          endereco: client.address,
          saldo: 0,
        },
      });
      return ClientMapper.toDomain(createdClient);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findByEmail(email: string): Promise<Client | null> {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          email,
        },
      });
      if (!client) return null;
      return ClientMapper.toDomain(client);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findByCpf(cpf: string): Promise<Client | null> {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          cpf,
        },
      });
      if (!client) return null;
      return ClientMapper.toDomain(client);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findById(clientId: number): Promise<Client | null> {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          id_cliente: clientId,
        },
      });
      if (!client) return null;
      console.log('Client:', client);
      return ClientMapper.toDomain(client);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      const clients = await this.prisma.client.findMany();
      return clients.map(ClientMapper.toDomain);
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  async update(client: Client): Promise<Client | null> {
    try {
      const updatedClient = await this.prisma.client.update({
        where: {
          id_cliente: client.clientId,
        },
        data: {
          cpf: client.cpf,
          nome: client.name,
          telefone: client.phone,
          email: client.email,
          endereco: client.address,
          saldo: client.balance,
        },
      });
      return ClientMapper.toDomain(updatedClient);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async delete(clientId: number): Promise<Client | null> {
    try {
      const deletedClient = await this.prisma.client.delete({
        where: {
          id_cliente: clientId,
        },
      });
      return ClientMapper.toDomain(deletedClient);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
