import { Transaction as TransactionPrisma } from '@prisma/client';
import { Transaction } from '@/domain/entities';
import { Decimal } from '@prisma/client/runtime/library';

export class TransactionMapper {
  static toDomain(transaction: TransactionPrisma): Transaction {
    return new Transaction(
      transaction.id_transacao,
      transaction.data_transacao ?? new Date(),
      Number(transaction.valor) ?? 0,
      transaction.status ?? '',
      transaction.tipo ?? '',
      transaction.id_cliente ?? 0,
    );
  }

  static toPersistence(transaction: Transaction): TransactionPrisma {
    return {
      id_transacao: transaction.transactionId,
      data_transacao: transaction.transactionDate,
      valor: new Decimal(transaction.value),
      status: transaction.status,
      tipo: transaction.type,
      id_cliente: transaction.clientId,
    };
  }
}
