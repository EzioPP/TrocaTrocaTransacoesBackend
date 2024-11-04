import { IUserRepository } from '@/domain/repositories';
import { IUserServices } from '@/domain/services';
import * as bcrypt from 'bcrypt';
import { logger } from '../logger';

export class userServices implements IUserServices {
  constructor(private readonly userRepository: IUserRepository) {
    //
  }
  async encryptPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      logger.error(error);
      return '';
    }
  }
  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      logger.error(error);
      return false;
    }
  }
  async login(username: string, password: string): Promise<string> {
    try {
      const user = await this.userRepository.findByUsername(username);
      if (!user) {
        return 'User not found';
      }
      const isPasswordCorrect = await this.comparePassword(
        password,
        user.password,
      );
      if (!isPasswordCorrect) {
        return 'Incorrect password';
      }
      return 'username successful';
    } catch (error) {
      logger.error(error);
      return '';
    }
  }
}
