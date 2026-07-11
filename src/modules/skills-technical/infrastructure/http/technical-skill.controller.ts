import { Request, Response, NextFunction } from 'express';
import { AppError } from 'src/shared/errors/AppError';
import { CreateTechnicalSkillUseCase } from 'src/modules/skills-technical/application/create-technical-skill.use-case';
import { ListTechnicalSkillsUseCase } from 'src/modules/skills-technical/application/list-technical-skills.use-case';
import { GetTechnicalSkillUseCase } from 'src/modules/skills-technical/application/get-technical-skill.use-case';

const pickImage = (req: Request): Express.Multer.File | undefined =>
  ((req.files as Express.Multer.File[]) ?? []).find((f) => f.fieldname === 'image');

export class TechnicalSkillController {
  constructor(
    private readonly createSkillUseCase: CreateTechnicalSkillUseCase,
    private readonly listSkillsUseCase: ListTechnicalSkillsUseCase,
    private readonly getSkillUseCase: GetTechnicalSkillUseCase,
  ) { }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const image = pickImage(req);
      if (!image) throw new AppError("El campo 'image' (archivo) es requerido", 400);

      const skill = await this.createSkillUseCase.execute(req.body, image);
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
