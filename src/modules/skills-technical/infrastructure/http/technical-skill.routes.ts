import { Router } from 'express';
import { uploadFile } from 'src/shared/middlewares/upload-file.middleware';
import { validateDTO } from 'src/shared/middlewares/validate-dto.middleware';
import { CreateTechnicalSkillDto } from 'src/modules/skills-technical/application/create-technical-skill.dto';
import { TechnicalSkillController } from 'src/modules/skills-technical/infrastructure/http/technical-skill.controller';

export const buildTechnicalSkillRouter = (controller: TechnicalSkillController): Router => {
  const router = Router();

  router.post('/', uploadFile, validateDTO(CreateTechnicalSkillDto), controller.create);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findOne);

  return router;
};
