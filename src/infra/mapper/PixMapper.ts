import { Pix as PixPrisma } from '@prisma/client';
import { Pix } from '@/domain/entities';

export class PixMapper {
  static toDomain(pix: PixPrisma): Pix {
    return new Pix(pix.id_pix ?? '', pix.tipo_chave ?? '', pix.id_cliente ?? 0);
  }
  static toPersistence(pix: Pix): any {
    return {
      id_pix: pix.pixId,
      tipo_chave: pix.keyType,
      id_cliente: pix.clientId,
    };
  }
}
