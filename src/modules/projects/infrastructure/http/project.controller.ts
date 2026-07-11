import { Request, Response, NextFunction } from 'express';
import { AppError } from 'src/shared/errors/AppError';
import { CreateProjectUseCase } from 'src/modules/projects/application/create-project.use-case';
import { ListProjectsUseCase } from 'src/modules/projects/application/list-projects.use-case';
import { GetProjectUseCase } from 'src/modules/projects/application/get-project.use-case';

const pickImage = (req: Request): Express.Multer.File | undefined =>
  ((req.files as Express.Multer.File[]) ?? []).find((f) => f.fieldname === 'image');

export class ProjectController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly listProjectsUseCase: ListProjectsUseCase,
    private readonly getProjectUseCase: GetProjectUseCase,
  ) { }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const image = pickImage(req);
      if (!image) throw new AppError("El campo 'image' (archivo) es requerido", 400);
      const project = await this.createProjectUseCase.execute(req.body, image);
      res.status(201).json(project.toPublic());
    } catch (err) {
      next(err);
    }
  };

  findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projects = await this.listProjectsUseCase.execute();
      res.status(200).json(projects.map((p) => p.toPublic()));
    } catch (err) {
      next(err);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const project = await this.getProjectUseCase.execute(req.params.id as string);
      res.status(200).json(project.toPublic());
    } catch (err) {
      next(err);
    }
  };
}
