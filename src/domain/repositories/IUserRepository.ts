import { User } from '../entities/User';

export interface IUserRepository {
  save(user: User): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findById(userId: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<User | null>;
  delete(userId: number): Promise<User | null>;
}
