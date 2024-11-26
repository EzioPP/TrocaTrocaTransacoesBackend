export class Transaction {
  private _transactionId: number;
  private _transactionDate: Date;
  private _value: number;
  private _status: string;
  private _type: string;
  private _clientId: number;

  constructor(
    transactionId: number,
    transactionDate: Date,
    value: number,
    status: string,
    type: string,
    clientId: number,
  ) {
    this._transactionId = transactionId;
    this._transactionDate = transactionDate;
    this._value = value;
    this._status = status;
    this._type = type;
    this._clientId = clientId;
  }

  get transactionId(): number {
    return this._transactionId;
  }

  get transactionDate(): Date {
    return this._transactionDate;
  }

  get value(): number {
    return this._value;
  }

  get status(): string {
    return this._status;
  }

  get type(): string {
    return this._type;
  }

  get clientId(): number {
    return this._clientId;
  }

  set transactionId(value: number) {
    this._transactionId = value;
  }

  set transactionDate(value: Date) {
    this._transactionDate = value;
  }

  set value(value: number) {
    this._value = value;
  }

  set status(value: string) {
    this._status = value;
  }

  set type(value: string) {
    this._type = value;
  }

  set clientId(value: number) {
    this._clientId = value;
  }
}
