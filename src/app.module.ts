import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { DriverModule } from './driver/driver.module';
import { TruckModule } from './truck/truck.module';
import { PanierModule } from './panier/panier.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ChatModule } from './chat/chat.module';
import { CommentModule } from './comment/comment.module';
import { NotificationModule } from './notification/notification.module';
import { ChatGateway } from './chat.gateway';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DeviseModule } from './devise/devise.module';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOption),
    UsersModule,
    AdminModule,
    CustomerModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    OrderItemModule,
    DriverModule,
    TruckModule,
    PanierModule,
    DeliveryModule,
    ChatModule,
    CommentModule,
    NotificationModule,
    DeviseModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, NotificationGateway],
})
export class AppModule {}
