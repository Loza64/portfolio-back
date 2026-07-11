import { Request, Response, NextFunction } from 'express';
import { CreateMessageUseCase } from 'src/modules/messages/application/create-message.use-case';

export class MessageController {
  constructor(private readonly createMessageUseCase: CreateMessageUseCase) { }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const message = await this.createMessageUseCase.execute(req.body);
      res.status(201).json(message.toPublic());
    } catch (err) {
      next(err);
    }
  };
}
