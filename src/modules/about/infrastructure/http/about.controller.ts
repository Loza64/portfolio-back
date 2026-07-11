import { Request, Response, NextFunction } from 'express';
import { CreateAboutUseCase } from 'src/modules/about/application/create-about.use-case';
import { ListAboutUseCase } from 'src/modules/about/application/list-about.use-case';
import { GetAboutUseCase } from 'src/modules/about/application/get-about.use-case';

export class AboutController {
  constructor(
    private readonly createAboutUseCase: CreateAboutUseCase,
    private readonly listAboutUseCase: ListAboutUseCase,
    private readonly getAboutUseCase: GetAboutUseCase,
  ) { }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const about = await this.createAboutUseCase.execute(req.body);
      res.status(201).json(about.toPublic());
    } catch (err) {
      next(err);
    }
  };

  findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const about = await this.listAboutUseCase.execute();
      res.status(200).json(about.map((a) => a.toPublic()));
    } catch (err) {
      next(err);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const about = await this.getAboutUseCase.execute(req.params.id as string);
      res.status(200).json(about.toPublic());
    } catch (err) {
      next(err);
    }
  };
}
