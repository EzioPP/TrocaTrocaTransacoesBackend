import { Card } from '@/domain/entities';
import { ICardRepository } from '@/domain/repositories/ICardRepository';
import { CardMapper } from '@/infra/mapper/CardMapper';
import { logger } from '@/infra/logger/logger';

import { PrismaClient } from '@prisma/client';

export class PrismaCardRepository implements ICardRepository {
  constructor(private prisma: PrismaClient) {}

  async save(card: Card): Promise<Card | null> {
    try {
      const createdCard = await this.prisma.card.create({
        data: {
          data_validade: card.expirationDate,
          numero_cartao: card.cardNumber,
          codigo_seguranca: card.cvv,
          limite_cartao: card.limit,
          id_cliente: card.clientId,
        },
      });
      return CardMapper.toDomain(createdCard);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
  async findById(cardId: number): Promise<Card | null> {
    try {
      const card = await this.prisma.card.findUnique({
        where: {
          id_cartao: cardId,
        },
      });
      if (!card) return null;
      return CardMapper.toDomain(card);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
  async findByNumber(cardNumber: string): Promise<Card | null> {
    try {
      const card = await this.prisma.card.findUnique({
        where: {
          numero_cartao: cardNumber,
        },
      });
      if (!card) return null;
      return CardMapper.toDomain(card);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
  async findAll(): Promise<Card[]> {
    try {
      const cards = await this.prisma.card.findMany();
      return cards.map(CardMapper.toDomain);
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  async update(card: Card): Promise<Card | null> {
    try {
      const updatedCard = await this.prisma.card.update({
        where: {
          id_cartao: card.cardId,
        },
        data: {
          data_validade: card.expirationDate,
          numero_cartao: card.cardNumber,
          codigo_seguranca: card.cvv,
          limite_cartao: card.limit,
          id_cliente: card.clientId,
        },
      });
      return CardMapper.toDomain(updatedCard);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async delete(cardId: number): Promise<Card | null> {
    try {
      const deletedCard = await this.prisma.card.delete({
        where: {
          id_cartao: cardId,
        },
      });
      return CardMapper.toDomain(deletedCard);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
