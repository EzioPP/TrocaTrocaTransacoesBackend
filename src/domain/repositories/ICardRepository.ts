import { Card } from '../entities/Card';
export interface ICardRepository {
  save(card: Card): Promise<Card | null>;
  findByNumber(cardNumber: string): Promise<Card | null>;
  findById(cardId: number): Promise<Card | null>;
  findByClientId(clientId: number): Promise<Card[]>;
  findByClientIdAndType(clientId: number, type: string): Promise<Card[]>;
  findAll(): Promise<Card[]>;
  update(card: Card): Promise<Card | null>;
  delete(cardId: number): Promise<Card | null>;
}
