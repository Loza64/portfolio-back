import { Router } from 'express';
import { validateDTO } from 'src/shared/middlewares/validate-dto.middleware';
import { CreateProfessionalSkillDto } from 'src/modules/skills-professional/application/create-professional-skill.dto';
import { ProfessionalSkillController } from 'src/modules/skills-professional/infrastructure/http/professional-skill.controller';

export const buildProfessionalSkillRouter = (controller: ProfessionalSkillController): Router => {
  const router = Router();

  router.post('/', validateDTO(CreateProfessionalSkillDto), controller.create);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findOne);

  return router;
};
