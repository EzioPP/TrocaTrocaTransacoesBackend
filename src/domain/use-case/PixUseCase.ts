import { Pix } from '../entities/Pix';
import { IPixRepository } from '../repositories/IPixRepository';
/* export interface IPixRepository {
    save(pix: Pix): Promise<Pix | null>;
    findByKey(key: string): Promise<Pix | null>;
    findById(pixId: number): Promise<Pix | null>;
    findAll(): Promise<Pix[]>;
    update(pix: Pix): Promise<Pix | null>;
    delete(pixId: number): Promise<Pix | null>;
  } */

export class PixUseCase {
  constructor(private iPixRepository: IPixRepository) {
    //
  }
  async save(pix: Pix): Promise<Pix | null> {
    return await this.iPixRepository.save(pix);
  }
  async findByKey(key: string): Promise<Pix | null> {
    return await this.iPixRepository.findByKey(key);
  }
  async findById(pixId: number): Promise<Pix | null> {
    return await this.iPixRepository.findById(pixId);
  }
  async findByClientId(clientId: number): Promise<Pix[]> {
    return await this.iPixRepository.findByClientId(clientId);
  }
  async findAll(): Promise<Pix[]> {
    return await this.iPixRepository.findAll();
  }
  async update(pix: Pix): Promise<Pix | null> {
    return await this.iPixRepository.update(pix);
  }
  async delete(pixId: number): Promise<Pix | null> {
    return await this.iPixRepository.delete(pixId);
  }
}
