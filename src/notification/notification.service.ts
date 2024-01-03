import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { DeliveryService } from 'src/delivery/delivery.service';

@Injectable()
export class NotificationService {
  constructor(
    readonly orderService: OrderService,
    readonly deliveryService: DeliveryService,
  ) {}

  @InjectRepository(Notification)
  readonly notificationRepository: Repository<Notification>;

  async create(createNotificationDto: CreateNotificationDto) {
    const notif = await this.notificationRepository.create(
      createNotificationDto,
    );

    if (createNotificationDto.order_id) {
      const order = await this.orderService.findOne(
        createNotificationDto.order_id,
      );
      notif.order = order;
    }

    if (createNotificationDto.delivery_id) {
      const delivery = await this.deliveryService.findOne(
        createNotificationDto.delivery_id,
      );

      notif.delivery = delivery;
    }

    return await this.notificationRepository.save(notif);
  }

  async findAll() {
    return await this.notificationRepository.find({
      relations: ['order'],
    });
  }

  async findOne(id: number) {
    const notif = await this.notificationRepository.findOneBy({ id });
    if (!notif) throw new NotFoundException('notification not found');

    return notif;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} ${updateNotificationDto} notification`;
  }

  async remove(id: number) {
    const notif = await this.findOne(id);
    await this.notificationRepository.remove(notif);
    return notif;
  }

  async getNotificationByCustomer(id: number) {
    const notif = await this.notificationRepository
      .createQueryBuilder()
      .select('notification.id', 'id')
      .addSelect('notification.content', 'content')
      .addSelect('notification.status', 'status')
      .addSelect('order.id', 'orderId')
      .addSelect('order.customer', 'customer')
      .from('notification', 'notification')
      .innerJoin('notification.order', 'order')
      .where('order.customer = :customer', { customer: id })
      .groupBy('notification.id')
      .addGroupBy('order.id')
      .getRawMany();
    return notif;
  }
}
