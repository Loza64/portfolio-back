import { Router } from 'express';
import { NotificationController } from 'src/modules/notification/infrastructure/http/notification.controller';

export const buildNotificationRouter = (controller: NotificationController): Router => {
  const router = Router();

  router.get('/notify', controller.notifyAll);

  return router;
};
