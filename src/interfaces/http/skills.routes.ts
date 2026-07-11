import { Router } from 'express';
import { Container } from 'src/composition-root';
import { buildTechnicalSkillRouter } from 'src/modules/skills-technical/infrastructure/http/technical-skill.routes';
import { buildProfessionalSkillRouter } from 'src/modules/skills-professional/infrastructure/http/professional-skill.routes';

export const buildSkillsRouter = (container: Container): Router => {
  const router = Router();

  router.use('/technical', buildTechnicalSkillRouter(container.technicalSkillController));
  router.use('/professional', buildProfessionalSkillRouter(container.professionalSkillController));

  return router;
};
