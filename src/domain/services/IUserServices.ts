export interface IUserServices {
    encryptPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}