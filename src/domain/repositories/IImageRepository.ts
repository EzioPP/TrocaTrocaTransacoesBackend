import { Image } from '../entities/Image';

export interface IImageRepository {
  save(image: Image): Promise<Image | null>;
  findByImageId(imageId: number): Promise<Image | null>;
  findByTitle(title: string): Promise<Image | null>;
  findAll(): Promise<Image[]>;
  update(image: Image): Promise<Image | null>;
  delete(imageId: number): Promise<Image | null>;
}
