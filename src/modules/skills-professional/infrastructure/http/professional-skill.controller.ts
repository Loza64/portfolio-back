import { Request, Response, NextFunction } from 'express';
import { CreateProfessionalSkillUseCase } from 'src/modules/skills-professional/application/create-professional-skill.use-case';
import { ListProfessionalSkillsUseCase } from 'src/modules/skills-professional/application/list-professional-skills.use-case';
import { GetProfessionalSkillUseCase } from 'src/modules/skills-professional/application/get-professional-skill.use-case';

export class ProfessionalSkillController {
  constructor(
    private readonly createSkillUseCase: CreateProfessionalSkillUseCase,
    private readonly listSkillsUseCase: ListProfessionalSkillsUseCase,
    private readonly getSkillUseCase: GetProfessionalSkillUseCase,
  ) { }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const skill = await this.createSkillUseCase.execute(req.body);
      res.status(201).json(skill.toPublic());
    } catch (err) {
      next(err);
    }
  };

  findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const skills = await this.listSkillsUseCase.execute();
      res.status(200).json(skills.map((s) => s.toPublic()));
    } catch (err) {
      next(err);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const skill = await this.getSkillUseCase.execute(req.params.id as string);
      res.status(200).json(skill.toPublic());
    } catch (err) {
      next(err);
    }
  };
}
