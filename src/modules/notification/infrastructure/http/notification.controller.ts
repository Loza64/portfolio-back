import { Request, Response, NextFunction } from 'express';
import { NotifyAllUseCase } from 'src/modules/notification/application/notify-all.use-case';

export class NotificationController {
  constructor(private readonly notifyAllUseCase: NotifyAllUseCase) {}

  notifyAll = (_req: Request, res: Response, _next: NextFunction): void => {
    this.notifyAllUseCase.execute('Hola a todos desde el servidor');
    res.status(200).json({ status: 200, message: 'Notificación enviada' });
  };
}
