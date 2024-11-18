import { Card } from '../entities/Card';
import { ICardRepository } from '../repositories/ICardRepository';

export class CardUseCase {
  constructor(private iCardRepository: ICardRepository) {
    //
  }
  async save(card: Card): Promise<void> {
    await this.iCardRepository.save(card);
  }
  async findByNumber(cardNumber: string): Promise<Card | null> {
    return await this.iCardRepository.findByNumber(cardNumber);
  }
  async findById(cardId: number): Promise<Card | null> {
    return await this.iCardRepository.findById(cardId);
  }
  async findAll(): Promise<Card[]> {
    return await this.iCardRepository.findAll();
  }

  async findByClientId(clientId: number): Promise<Card[]> {
    return await this.iCardRepository.findByClientId(clientId);
  }

  async update(card: Card): Promise<Card | null> {
    return await this.iCardRepository.update(card);
  }
  async delete(cardId: number): Promise<Card | null> {
    return await this.iCardRepository.delete(cardId);
  }
}
