import { Pix } from '../entities/Pix';

export interface IPixRepository {
  save(pix: Pix): Promise<Pix | null>;
  findByKey(key: string): Promise<Pix | null>;
  findById(pixId: number): Promise<Pix | null>;
  findAll(): Promise<Pix[]>;
  update(pix: Pix): Promise<Pix | null>;
  delete(pixId: number): Promise<Pix | null>;
}
