import { NotificationPublisher } from 'src/shared/realtime/notification-publisher.port';
import { getSocketIO } from 'src/shared/realtime/websocket/socket.gateway';

export class SocketNotificationPublisher implements NotificationPublisher {
  broadcast(message: string): void {
    getSocketIO().emit('notification', { message });
  }

  emitToRoom(room: string, message: string): void {
    getSocketIO().to(room).emit('room_message', { from: 'server', room, message });
  }
}
