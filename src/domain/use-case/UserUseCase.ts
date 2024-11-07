import { User } from '@/domain/entities';
import { IUserRepository } from '@/domain/repositories';
import { IUserServices } from '@/domain/services';

export class UserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userServices: IUserServices,
  ) {
    //
  }
  async save(user: User): Promise<User | null> {
    const encryptedPassword = await this.userServices.encryptPassword(
      user.password,
    );
    user.password = encryptedPassword;
    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async findById(userId: number): Promise<User | null> {
    return this.userRepository.findById(userId);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async update(user: User): Promise<User | null> {
    const encryptedPassword = await this.userServices.encryptPassword(
      user.password,
    );
    user.password = encryptedPassword;
    return this.userRepository.update(user);
  }
  async delete(userId: number): Promise<User | null> {
    return this.userRepository.delete(userId);
  }
  async login(username: string, password: string): Promise<string | null> {
    return this.userRepository.login(username, password);
  }
}
