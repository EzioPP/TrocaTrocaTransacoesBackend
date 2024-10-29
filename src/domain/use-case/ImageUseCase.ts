import { Image } from '../entities/Image';
import { IImageRepository } from '../repositories/IImageRepository';

export class ImageUseCase {
  constructor(private iImageRepository: IImageRepository) {
    //
  }
  async save(image: Image): Promise<void> {
    await this.iImageRepository.save(image);
  }
  async findByImageId(imageId: number): Promise<Image | null> {
    return await this.iImageRepository.findByImageId(imageId);
  }
  async findAll(): Promise<Image[]> {
    return await this.iImageRepository.findAll();
  }
  async update(image: Image): Promise<Image | null> {
    return await this.iImageRepository.update(image);
  }
  async delete(imageId: number): Promise<Image | null> {
    return await this.iImageRepository.delete(imageId);
  }
}
