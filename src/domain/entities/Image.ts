export class Image {
  _imageId: number;
  _imageData: Buffer;
  _imagePath?: string;

  constructor(imageId: number, image: Buffer, imagePath?: string) {
    this._imageId = imageId;
    this._imageData = image;
    this._imagePath = imagePath;
  }
  get imageId(): number {
    return this._imageId;
  }

  get imageData(): Buffer {
    return this._imageData;
  }

  set imageData(_imageData: Buffer) {
    this._imageData = _imageData;
  }

  get imagePath(): string | undefined {
    return this._imagePath;
  }

  set imagePath(_imagePath: string | undefined) {
    this._imagePath = _imagePath;
  }
}
