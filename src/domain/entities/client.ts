export class Client {
  private _clientId: number;
  private _cpf: string;
  private _name: string;
  private _balance: number;
  private _phone: string;
  private _email: string;
  private _address: string;

  constructor(
    clientId: number,
    cpf: string,
    name: string,
    phone: string,
    email: string,
    address: string,
    balance: number = 0,
  ) {
    this._clientId = clientId;
    this._cpf = cpf;
    this._name = name;
    this._phone = phone;
    this._email = email;
    this._balance = balance;
    this._address = address;
  }

  get clientId(): number {
    return this._clientId;
  }

  get cpf(): string {
    return this._cpf;
  }

  get name(): string {
    return this._name;
  }

  get phone(): string {
    return this._phone;
  }

  get email(): string {
    return this._email;
  }

  get address(): string {
    return this._address;
  }

  get balance(): number {
    return this._balance;
  }

  set clientId(value: number) {
    this._clientId = value;
  }

  set cpf(value: string) {
    this._cpf = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set phone(value: string) {
    this._phone = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set address(value: string) {
    this._address = value;
  }

  set balance(value: number) {
    this._balance = value;
  }
}
