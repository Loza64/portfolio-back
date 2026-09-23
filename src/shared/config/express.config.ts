import type { CorsOptions } from 'cors';
import { env } from 'src/shared/config/env';

const origins = env.ORIGIN?.split(',').map((o) => o.trim()).filter(Boolean) ?? [];

export const corsConfig: CorsOptions = {
  origin: origins.length ? origins : '*',
  credentials: origins.length > 0,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
};

export const jsonConfig = {
  limit: '10mb',
  strict: false,
  inflate: true,
  type: 'application/json',
};

export const urlEncodeConfig = {
  extended: true,
  limit: '50mb',
  parameterLimit: 1000,
};

export const multerConfig = {
  fileSizeLimitMB: 10,
};