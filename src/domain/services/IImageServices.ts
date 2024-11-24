export interface IImageServices {
    convertImageToBuffer(image: string): Promise<Buffer>;
    changeResolution(image: Buffer, width: number, height: number): Promise<Buffer>;
}