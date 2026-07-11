import { Router } from 'express';
import { validateDTO } from 'src/shared/middlewares/validate-dto.middleware';
import { CreateMessageDto } from 'src/modules/messages/application/create-message.dto';
import { MessageController } from 'src/modules/messages/infrastructure/http/message.controller';

export const buildMessageRouter = (controller: MessageController): Router => {
  const router = Router();

  router.post('/', validateDTO(CreateMessageDto), controller.create);

  return router;
};
