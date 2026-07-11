export interface UploadedImage {
  url: string;
  publicId: string;
}

/**
 * Puerto de salida compartido entre modulos que necesitan subir imagenes
 * (projects, technical skills, etc). El dominio/aplicacion solo conoce
 * este contrato; el adaptador concreto (Cloudinary, S3, disco local...)
 * vive en infrastructure y es intercambiable desde el composition-root.
 */
export interface ImageUploader {
  upload(file: Express.Multer.File, folder: string): Promise<UploadedImage>;
}

export const IMAGE_UPLOADER = Symbol('IMAGE_UPLOADER');
