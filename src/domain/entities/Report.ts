export class Report {
  private _reportId?: number;
  private _reportDate: Date;
  private _reportType: string;
  private _clientId: number;
  private _imageId: number;

  constructor(
    reportId: number | undefined,
    reportDate: Date,
    reportType: string,
    clientId: number,
    imageId: number,
  ) {
    this._reportId = reportId;
    this._reportDate = reportDate;
    this._reportType = reportType;
    this._clientId = clientId;
    this._imageId = imageId;
  }

  get reportId(): number | undefined {
    return this._reportId;
  }

  get reportDate(): Date {
    return this._reportDate;
  }

  get reportType(): string {
    return this._reportType;
  }

  get clientId(): number {
    return this._clientId;
  }

  get imageId(): number {
    return this._imageId;
  }

  set reportId(value: number | undefined) {
    this._reportId = value;
  }

  set reportDate(value: Date) {
    this._reportDate = value;
  }

  set reportType(value: string) {
    this._reportType = value;
  }

  set clientId(value: number) {
    this._clientId = value;
  }

  set imageId(value: number) {
    this._imageId = value;
  }
}
