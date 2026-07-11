import { Router } from 'express';
import { validateDTO } from 'src/shared/middlewares/validate-dto.middleware';
import { CreateAboutDto } from 'src/modules/about/application/create-about.dto';
import { AboutController } from 'src/modules/about/infrastructure/http/about.controller';

export const buildAboutRouter = (controller: AboutController): Router => {
  const router = Router();

  router.post('/', validateDTO(CreateAboutDto), controller.create);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findOne);

  return router;
};
