export class User {
  private _id: number;
  private _username: string;
  private _password: string;
  private _permission: string;
  private _clientId: number;

  constructor(
    id: number,
    username: string,
    password: string,
    permission: string,
    clientId: number,
  ) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._permission = permission;
    this._clientId = clientId;
  }

  get id(): number {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  get permission(): string {
    return this._permission;
  }

  get clientId(): number {
    return this._clientId;
  }

  set id(value: number) {
    this._id = value;
  }

  set password(value: string) {
    this._password = value;
  }

  set permission(value: string) {
    this._permission = value;
  }

  set clientId(value: number) {
    this._clientId = value;
  }
}
