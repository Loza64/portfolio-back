import http from 'http';
import app from 'src/app';
import { env } from 'src/shared/config/env';
import { serverLog, errorLog } from 'src/shared/logger/logger';
import { initSocket } from 'src/shared/realtime/websocket/socket.gateway';
import { connectDatabase } from 'src/shared/infrastructure/database/mongoose.connection';

const start = async (): Promise<void> => {
  try {
    await connectDatabase();

    const httpServer = http.createServer(app);
    initSocket(httpServer);
    httpServer.listen(env.PORT, () => serverLog(`Running on http://localhost:${env.PORT}`));
  } catch (err) {
    errorLog('No se pudo iniciar el servidor: %O', err);
    process.exit(1);
  }
};

void start();
