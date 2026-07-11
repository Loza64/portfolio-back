import mongoose from 'mongoose';
import { env } from 'src/shared/config/env';
import { databaseLog } from 'src/shared/logger/logger';

export const connectDatabase = async (): Promise<void> => {
  if (!env.MONGO_URI) {
    databaseLog('MONGO_URI no esta definida: se omite la conexion a MongoDB');
    return;
  }

  mongoose.connection.on('error', (err) => databaseLog('Error de conexion: %O', err));

  await mongoose.connect(env.MONGO_URI);
  databaseLog('Conectado a MongoDB');
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};
