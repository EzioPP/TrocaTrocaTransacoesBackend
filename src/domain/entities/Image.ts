/* CREATE TABLE public.imagem (
  id_imagem serial4 NOT NULL,
  titulo varchar(255) NULL,
  imagem bytea NOT NULL,
  id_cliente int4 NULL,
  CONSTRAINT imagem_pkey PRIMARY KEY (id_imagem)
); */
export class Image {
  _imageId: number;
  _title: string;
  _image: Buffer;
  _clientId: number;

  constructor(imageId: number, title: string, image: Buffer, clientId: number) {
    this._imageId = imageId;
    this._title = title;
    this._image = image;
    this._clientId = clientId;
  }

  get imageId(): number {
    return this._imageId;
  }

  get title(): string {
    return this._title;
  }

  get image(): Buffer {
    return this._image;
  }

  get clientId(): number {
    return this._clientId;
  }

  set imageId(value: number) {
    this._imageId = value;
  }

  set title(value: string) {
    this._title = value;
  }

  set image(value: Buffer) {
    this._image = value;
  }

  set clientId(value: number) {
    this._clientId = value;
  }

}
