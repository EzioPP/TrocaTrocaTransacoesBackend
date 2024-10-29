import { User } from '../entities/User';

export interface IUserRepository {
  save(user: User): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findById(userId: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<User | null>;
  delete(userId: number): Promise<User | null>;

  /**************/

  encryptPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}
