export class Pix {
  private _pixId: number;
  private _keyType: string;
  private _clientId: number;

  constructor(pixId: number, keyType: string, clientId: number) {
    this._pixId = pixId;
    this._keyType = keyType;
    this._clientId = clientId;
  }

  get pixId(): number {
    return this._pixId;
  }

  get keyType(): string {
    return this._keyType;
  }

  get clientId(): number {
    return this._clientId;
  }

  set pixId(value: number) {
    this._pixId = value;
  }

  set keyType(value: string) {
    this._keyType = value;
  }

  set clientId(value: number) {
    this._clientId = value;
  }
}
