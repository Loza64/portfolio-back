import { config } from 'dotenv';

config();

export const env = {
  PORT: Number(process.env.PORT) || 4000,
  ORIGIN: process.env.ORIGIN,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  isDev: (process.env.NODE_ENV ?? 'development') === 'development',

  MONGO_URI: process.env.MONGO_URI ?? '',

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ?? '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ?? '',

  MAIL_HOST: process.env.MAIL_HOST ?? '',
  MAIL_PORT: Number(process.env.MAIL_PORT) || 465,
  MAIL_USER: process.env.MAIL_USER ?? '',
  MAIL_PASS: process.env.MAIL_PASS ?? '',
  MAIL_TO: process.env.MAIL_TO ?? process.env.MAIL_USER ?? '',
};
