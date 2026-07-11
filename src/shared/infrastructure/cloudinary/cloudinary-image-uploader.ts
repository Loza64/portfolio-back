import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { env } from 'src/shared/config/env';
import { AppError } from 'src/shared/errors/AppError';
import { ImageUploader, UploadedImage } from 'src/shared/ports/image-uploader.port';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export class CloudinaryImageUploader implements ImageUploader {
  upload(file: Express.Multer.File, folder: string): Promise<UploadedImage> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder },
        (error, result) => {
          if (error || !result) {
            reject(new AppError(`Error subiendo la imagen a Cloudinary: ${error?.message ?? 'desconocido'}`, 502));
            return;
          }

          resolve({ url: result.url, publicId: result.public_id });
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}
