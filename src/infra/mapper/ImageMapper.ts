import { Image } from '@/domain/entities';
import { Image as ImagePrisma } from '@prisma/client';

export class ImageMapper {
  static toDomain(image: ImagePrisma): Image {
    return new Image(
      image.id_imagem,
      image.titulo ?? '',
      image.imagem,
      image.id_cliente ?? 0,
    );
  }

  static toPersistence(image: Image): ImagePrisma {
    return {
      id_imagem: image.imageId,
      titulo: image.title,
      imagem: image.image,
      id_cliente: image.clientId,
    };
  }
}