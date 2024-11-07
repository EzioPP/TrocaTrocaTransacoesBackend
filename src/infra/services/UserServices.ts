import { IUserRepository } from '@/domain/repositories';
import { IUserServices } from '@/domain/services';
import * as bcrypt from 'bcrypt';
import { logger } from '../logger';

export class UserServices implements IUserServices {
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
}
