import { Injectable } from '@nestjs/common';
import { NotificationService } from '../notification.service';
import { OnEvent } from '@nestjs/event-emitter';
import { Order } from 'src/order/entities/order.entity';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationGateway } from 'src/notification.gateway';
import { Delivery } from 'src/delivery/entities/delivery.entity';

@Injectable()
export class NotificationSuscriber {
  constructor(
    readonly notificationService: NotificationService,
    readonly notifGatWay: NotificationGateway,
  ) {}

  @OnEvent('order.save')
  handleOrderCreateEvent(payloadOrder: Order) {
    console.log('utilisateur cree: ', payloadOrder);
    const notif: CreateNotificationDto = {
      content: 'Nouveau commande passée',
      status: 'create',
      order_id: payloadOrder.id,
      delivery_id: null,
    };
    this.notifGatWay.handleNotificationDelivery(notif);
  }

  @OnEvent('order.update')
  handleOrderupdateEvent(payloadOrder: Order) {
    console.log('utilisateur cree: ', payloadOrder);
    const notif: CreateNotificationDto = {
      content: 'Commande Encours',
      status: 'going',
      order_id: payloadOrder.id,
      delivery_id: null,
    };
    this.notifGatWay.handleNotificationDelivery(notif);
  }

  @OnEvent('order.update1')
  handleOrderupdat1eEvent(payloadOrder: Order) {
    const notif: CreateNotificationDto = {
      content: 'commande délivrée',
      status: 'finish',
      order_id: payloadOrder.id,
      delivery_id: null,
    };
    this.notifGatWay.handleNotificationDelivery(notif);
  }

  @OnEvent('delivery.save')
  handledeliveryCreateEvent(payload: Delivery) {
    const notif: CreateNotificationDto = {
      content: 'Vous avez un nouveau commande',
      status: 'create',
      order_id: null,
      delivery_id: payload.id,
    };
    this.notifGatWay.handleNotificationDelivery(notif);
  }

  @OnEvent('delivery.update')
  handledeliveryUpdateEvent(payload: Delivery) {
    const notif: CreateNotificationDto = {
      content: 'commande  mise ajour',
      status: 'create',
      order_id: null,
      delivery_id: payload.id,
    };
    this.notifGatWay.handleNotificationDelivery(notif);
  }
}
