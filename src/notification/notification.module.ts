import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationSuscriber } from './event/notification.suscriber';
import { OrderModule } from 'src/order/order.module';
import { CustomerModule } from 'src/customer/customer.module';
import { NotificationGateway } from 'src/notification.gateway';
import { DeliveryModule } from 'src/delivery/delivery.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    DeliveryModule,
    OrderModule,
    CustomerModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationSuscriber, NotificationGateway],
  exports: [NotificationService, TypeOrmModule],
})
export class NotificationModule {}
