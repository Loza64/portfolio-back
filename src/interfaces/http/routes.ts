import { Router } from 'express';
import { Container } from 'src/composition-root';
import healthRoutes from 'src/modules/health/infrastructure/http/health.routes';
import { buildNotificationRouter } from 'src/modules/notification/infrastructure/http/notification.routes';
import { buildAboutRouter } from 'src/modules/about/infrastructure/http/about.routes';
import { buildMessageRouter } from 'src/modules/messages/infrastructure/http/message.routes';
import { buildProjectRouter } from 'src/modules/projects/infrastructure/http/project.routes';
import { buildSkillsRouter } from 'src/interfaces/http/skills.routes';

export const buildApiRouter = (container: Container): Router => {
  const router = Router();

  router.use('/health', healthRoutes);
  router.use('/notifications', buildNotificationRouter(container.notificationController));
  router.use('/about', buildAboutRouter(container.aboutController));
  router.use('/messages', buildMessageRouter(container.messageController));
  router.use('/projects', buildProjectRouter(container.projectController));
  router.use('/skills', buildSkillsRouter(container));

  return router;
};
