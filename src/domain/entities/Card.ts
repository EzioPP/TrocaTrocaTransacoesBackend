export class Card {
  private _cardId: number;
  private _expirationDate: string;
  private _cardNumber: string;
  private _cvv: string;
  private _cardType: string;
  private _limit: number;
  private _clientId: number;

  constructor(
    cardId: number,
    expirationDate: string,
    cardNumber: string,
    cvv: string,
    cardType: string,
    limit: number,
    clientId: number,
  ) {
    this._cardId = cardId;
    this._expirationDate = expirationDate;
    this._cardNumber = cardNumber;
    this._cvv = cvv;
    this._cardType = cardType;
    this._limit = limit;
    this._clientId = clientId;
  }

  get cardId(): number {
    return this._cardId;
  }

  get expirationDate(): string {
    return this._expirationDate;
  }

  get cardNumber(): string {
    return this._cardNumber;
  }

  get cvv(): string {
    return this._cvv;
  }

  get cardType(): string {
    return this._cardType;
  }

  get limit(): number {
    return this._limit;
  }

  get clientId(): number {
    return this._clientId;
  }

  set cardId(value: number) {
    this._cardId = value;
  }

  set expirationDate(value: string) {
    this._expirationDate = value;
  }

  set cardNumber(value: string) {
    this._cardNumber = value;
  }

  set cvv(value: string) {
    this._cvv = value;
  }

  set cardType(value: string) {
    this._cardType = value;
  }

  set limit(value: number) {
    this._limit = value;
  }

  set clientId(value: number) {
    this._clientId = value;
  }
}
