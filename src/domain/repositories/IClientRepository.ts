import { Client } from '../entities/Client';
export interface IClientRepository {
  save(client: Client): Promise<Client | null>;
  findByEmail(email: string): Promise<Client | null>;
  findByCpf(cpf: string): Promise<Client | null>;
  findById(clientId: number): Promise<Client | null>;
  findByPhone(phone: string): Promise<Client | null>;
  findAll(): Promise<Client[]>;
  update(client: Client): Promise<Client | null>;
  delete(clientId: number): Promise<Client | null>;
}
