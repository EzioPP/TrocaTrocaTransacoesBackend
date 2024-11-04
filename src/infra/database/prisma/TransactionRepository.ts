import { Transaction } from '@/domain/entities';
import { ITransactionRepository } from '@/domain/repositories';
import { TransactionMapper } from '@/infra/mapper';
import { logger } from '../../logger/logger';

import { PrismaClient } from '@prisma/client';

export class PrismaTransactionRepository implements ITransactionRepository {
  constructor(private prisma: PrismaClient) {}

  async save(transaction: Transaction): Promise<Transaction | null> {
    try {
      const createdTransaction = await this.prisma.transaction.create({
        data: {
          data_transacao: transaction.transactionDate,
          valor: transaction.value,
          status: transaction.status,
          tipo: transaction.type,
          id_cliente: transaction.clientId,
        },
      });
      return TransactionMapper.toDomain(createdTransaction);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findById(transactionId: number): Promise<Transaction | null> {
    try {
      const transaction = await this.prisma.transaction.findUnique({
        where: {
          id_transacao: transactionId,
        },
      });
      if (!transaction) return null;
      return TransactionMapper.toDomain(transaction);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async findAll(): Promise<Transaction[]> {
    try {
      const transactions = await this.prisma.transaction.findMany();
      return transactions.map((transaction) =>
        TransactionMapper.toDomain(transaction),
      );
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  async findByClientId(clientId: number): Promise<Transaction[]> {
    try {
      const transactions = await this.prisma.transaction.findMany({
        where: {
          id_cliente: clientId,
        },
      });
      return transactions.map((transaction) =>
        TransactionMapper.toDomain(transaction),
      );
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  async update(transaction: Transaction): Promise<Transaction | null> {
    try {
      const updatedTransaction = await this.prisma.transaction.update({
        where: {
          id_transacao: transaction.transactionId,
        },
        data: {
          data_transacao: transaction.transactionDate,
          valor: transaction.value,
          status: transaction.status,
          tipo: transaction.type,
          id_cliente: transaction.clientId,
        },
      });
      return TransactionMapper.toDomain(updatedTransaction);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async delete(transactionId: number): Promise<Transaction | null> {
    try {
      const deletedTransaction = await this.prisma.transaction.delete({
        where: {
          id_transacao: transactionId,
        },
      });
      return TransactionMapper.toDomain(deletedTransaction);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
