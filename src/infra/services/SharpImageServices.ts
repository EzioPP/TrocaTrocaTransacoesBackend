import { IImageServices } from "@/domain/services";
import sharp from 'sharp';

export class SharpImageServices implements IImageServices {
    async convertImageToBuffer(path: string): Promise<Buffer> {
        try {
            const buffer = await sharp(path).toBuffer();
            return buffer;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error converting image to buffer: ${error.message}`);
            } else {
                throw new Error('Error converting image to buffer');
            }
        }
    }

    async changeResolution(image: Buffer, width: number, height: number): Promise<Buffer> {
        try {
            const resizedImage = await sharp(image)
                .resize(width, height)
                .toBuffer();
            return resizedImage;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error changing image resolution: ${error.message}`);
            } else {
                throw new Error('Error changing image resolution');
            }
        }
    }

    async uploadImage(image: any): Promise<string> {
        // This is a placeholder implementation. You should replace it with actual upload logic.
        // For example, you might upload the image to a cloud storage service like AWS S3 or Google Cloud Storage.
        try {
            const buffer = await this.convertImageToBuffer(image);
            // Simulate upload and return a URL
            const imageUrl = `https://example.com/uploads/${Date.now()}.jpg`;
            return imageUrl;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error uploading image: ${error.message}`);
            } else {
                throw new Error('Error uploading image');
            }
        }
    }
}