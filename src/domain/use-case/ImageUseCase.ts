import { Image } from '../entities/Image';
import { IImageRepository } from '../repositories/IImageRepository';
import { IImageServices } from '../services';
export class ImageUseCase {
  constructor(private iImageRepository: IImageRepository, private iImageServices: IImageServices) {
    //
  }
  async save(image: Image): Promise<void> {
    let imageBuffer = await this.iImageServices.convertImageToBuffer(image.title);
    imageBuffer = await this.iImageServices.changeResolution(imageBuffer, 400, 400);
    image.image = imageBuffer;
    await this.iImageRepository.save(image);
  }
  async update(image: Image): Promise<void> {
    let imageBuffer = await this.iImageServices.convertImageToBuffer(image.title);
    imageBuffer = await this.iImageServices.changeResolution(imageBuffer, 400, 400);
    image.image = imageBuffer;
    await this.iImageRepository.update(image);
  }

  async delete(id: number): Promise<void> {
    await this.iImageRepository.delete(id);
  }

  async findAll(): Promise<Image[]> {
    return await this.iImageRepository.findAll();
  }

  async findByImageId(imageId: number): Promise<Image | null> {
    return await this.iImageRepository.findByImageId(imageId);
  }

  async findByTitle(title: string): Promise<Image | null> {
    return await this.iImageRepository.findByTitle(title);
  }
}