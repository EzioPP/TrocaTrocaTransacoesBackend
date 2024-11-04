import { Image } from '@/domain/entities';
import { Image as ImagePrisma } from '@prisma/client';

export class ImageMapper {
  static toDomain(image: ImagePrisma): Image {
    return new Image(image.id_imagem, image.imagem);
  }

  static toPersistence(image: Image): any {
    return {
      id_imagem: image._imageId,
      imagem: image._imageData,
    };
  }
}
