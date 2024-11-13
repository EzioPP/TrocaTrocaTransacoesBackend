import { IUserRepository } from '@/domain/repositories';
import { IUserServices } from '@/domain/services';
import { User } from '@/domain/entities';
import * as bcrypt from 'bcrypt';
import { logger } from '../logger';
import * as jwt from 'jsonwebtoken';

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

  async generateToken(user: User): Promise<string | null> {
    try {
      const secret = process.env.JWT_SECRET || '';
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        secret,
        {
          expiresIn: '1h',
        },
      );
      return token;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
