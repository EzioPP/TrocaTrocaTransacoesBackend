import { IUserServices } from "@/domain/services";
import * as bcrypt from 'bcrypt';

export class userServices implements IUserServices {
    async encryptPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}