import { Transaction } from '../entities/Transaction';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Transaction | null>;
  findByClientId(clientId: number): Promise<Transaction[]>;
  findById(transactionId: number): Promise<Transaction | null>;
  findByClientIdAndDateRange(clientId: number, dateRange: string): Promise<Transaction[]>;
  findAll(): Promise<Transaction[]>;
  update(transaction: Transaction): Promise<Transaction | null>;
  delete(transactionId: number): Promise<Transaction | null>;
}
