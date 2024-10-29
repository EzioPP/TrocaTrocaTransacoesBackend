import { Card as CardPrisma } from '@prisma/client';
import { Card } from '@/domain/entities/Card';
import { Decimal } from '@prisma/client/runtime/library';

export class CardMapper {
  static toDomain(card: CardPrisma): Card {
    return new Card(
      card.id_cartao,
      card.data_validade ?? new Date(),
      card.numero_cartao ?? '',
      card.codigo_seguranca ?? '',
      card.tipo_cartao ?? '',
      card.limite_cartao?.toNumber() ?? 0,
      card.id_cliente ?? 0,
    );
  }

  static toPersistence(card: Card): CardPrisma {
    return {
      id_cartao: card.cardId,
      data_validade: card.expirationDate,
      numero_cartao: card.cardNumber,
      codigo_seguranca: card.cvv,
      tipo_cartao: card.cardType,
      limite_cartao: new Decimal(card.limit),
      id_cliente: card.clientId,
    };
  }
}
