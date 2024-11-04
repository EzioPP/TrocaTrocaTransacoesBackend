export interface IUserServices {
  login(username: string, password: string): Promise<string>;
  encryptPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}
