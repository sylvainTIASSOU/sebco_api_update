import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification/notification.service';
import { CreateNotificationDto } from './notification/dto/create-notification.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway {
  constructor(private readonly notificationService: NotificationService) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('sendNotification')
  async handleNotificationDelivery(payload: CreateNotificationDto) {
    await this.notificationService.create(payload);
    this.server.emit('delivery', payload);
  }

  @SubscribeMessage('sendNotification')
  async handleUpdateNotification(payload: CreateNotificationDto) {
    await this.notificationService.create(payload);
    this.server.emit('message', payload);
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Connected: ${client.id}`);
  }
}
