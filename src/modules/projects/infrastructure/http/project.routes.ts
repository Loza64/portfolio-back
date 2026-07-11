import { Router, Request, Response, NextFunction } from 'express';
import { uploadFile } from 'src/shared/middlewares/upload-file.middleware';
import { validateDTO } from 'src/shared/middlewares/validate-dto.middleware';
import { CreateProjectDto } from 'src/modules/projects/application/create-project.dto';
import { ProjectController } from 'src/modules/projects/infrastructure/http/project.controller';

const parseNestedJsonFields = (req: Request, _res: Response, next: NextFunction): void => {
  if (typeof req.body?.links === 'string') {
    try {
      req.body.links = JSON.parse(req.body.links);
    } catch {
    }
  }
  next();
};

export const buildProjectRouter = (controller: ProjectController): Router => {
  const router = Router();

  router.post('/', uploadFile, parseNestedJsonFields, validateDTO(CreateProjectDto), controller.create);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findOne);

  return router;
};
