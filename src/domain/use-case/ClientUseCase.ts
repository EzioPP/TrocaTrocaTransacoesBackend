import { IClientRepository } from '../repositories/IClientRepository';
import { Client } from '../entities/Client';

export class ClientUseCase {
  constructor(private iClientRepository: IClientRepository) {
    //
  }
  async save(client: Client): Promise<Client | null> {
    return await this.iClientRepository.save(client);
  }
  async findByEmail(email: string): Promise<Client | null> {
    return await this.iClientRepository.findByEmail(email);
  }
  async findById(clientId: number): Promise<Client | null> {
    return await this.iClientRepository.findById(clientId);
  }
  async findByCpf(cpf: string): Promise<Client | null> {
    return await this.iClientRepository.findByCpf(cpf);
  }
  async findByPhone(phone: string): Promise<Client | null> {
    return await this.iClientRepository.findByPhone(phone);
  }
  async findAll(): Promise<Client[]> {
    return await this.iClientRepository.findAll();
  }
  async update(client: Client): Promise<Client | null> {
    return await this.iClientRepository.update(client);
  }
  async delete(clientId: number): Promise<Client | null> {
    return await this.iClientRepository.delete(clientId);
  }
}
