import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { buildContainer } from 'src/composition-root';
import { buildApiRouter } from 'src/interfaces/http/routes';
import { errorHandler } from 'src/shared/middlewares/error-handler.middleware';
import { corsConfig, jsonConfig, urlEncodeConfig } from 'src/shared/config/express.config';

export const createApp = (): Express => {
  const app = express();
  const container = buildContainer();

  app.use(helmet());
  app.use(cors(corsConfig));
  app.use(express.json(jsonConfig));
  app.use(express.urlencoded(urlEncodeConfig));
  app.use(morgan('dev'));

  app.use('/api', buildApiRouter(container));

  app.use(errorHandler);

  return app;
};

export default createApp();
