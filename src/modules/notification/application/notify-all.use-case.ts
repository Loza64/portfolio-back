import { NotificationPublisher } from 'src/shared/realtime/notification-publisher.port';

export class NotifyAllUseCase {
  constructor(private readonly publisher: NotificationPublisher) {}

  execute(message: string): void {
    this.publisher.broadcast(message);
  }
}
