/* 
export interface ITransactionRepository {
    save(transaction: Transaction): Promise<Transaction | null>;
    findByClientId(clientId: number): Promise<Transaction[]>;
    findById(transactionId: number): Promise<Transaction | null>;
    findAll(): Promise<Transaction[]>;
    update(transaction: Transaction): Promise<Transaction | null>;
    delete(transactionId: number): Promise<Transaction | null>;
  }
   */

import { Transaction } from '../entities/Transaction';
import { ITransactionRepository } from '../repositories/ITransactionRepository';

export class TransactionUseCase {
  constructor(private iTransactionRepository: ITransactionRepository) {
    //
  }
  async save(transaction: Transaction): Promise<Transaction | null> {
    return await this.iTransactionRepository.save(transaction);
  }
  async findByClientId(clientId: number): Promise<Transaction[]> {
    return await this.iTransactionRepository.findByClientId(clientId);
  }
  async findById(transactionId: number): Promise<Transaction | null> {
    return await this.iTransactionRepository.findById(transactionId);
  }
  async findAll(): Promise<Transaction[]> {
    return await this.iTransactionRepository.findAll();
  }
  async update(transaction: Transaction): Promise<Transaction | null> {
    return await this.iTransactionRepository.update(transaction);
  }
  async delete(transactionId: number): Promise<Transaction | null> {
    return await this.iTransactionRepository.delete(transactionId);
  }
}
