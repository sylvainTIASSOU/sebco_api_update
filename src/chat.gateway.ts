import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat/chat.service';
import { CreateChatDto } from './chat/dto/create-chat.dto';
import { NotificationService } from './notification/notification.service';
import { CreateNotificationDto } from './notification/dto/create-notification.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly notificationService: NotificationService,
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: CreateChatDto) {
    await this.chatService.create(payload);
    this.server.emit('message', payload);
  }

  @SubscribeMessage('sendNotification')
  async handleNotification(payload: CreateNotificationDto) {
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
