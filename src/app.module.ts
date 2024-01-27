import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { User } from 'src/users/entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { Driver } from 'src/driver/entities/driver.entity';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';
import { Truck } from 'src/truck/entities/truck.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Panier } from 'src/panier/entities/panier.entity';
import { Delivery } from 'src/delivery/entities/delivery.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Devise } from 'src/devise/entities/devise.entity';
import { config } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';

config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('POSTGRESQL_URL'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('BD_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          User,
          Admin,
          Customer,
          Driver,
          Order,
          OrderItem,
          Truck,
          Category,
          Product,
          Panier,
          Delivery,
          Chat,
          Comment,
          Notification,
          Devise,
        ],
        synchronize: true,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false, // For self-signed certificates
          },
        },
      }),
    }),
    /*  TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRESQL_URL,
      host: process.env.DB_HOST,
      port: Number(process.env.BD_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Admin,
        Customer,
        Driver,
        Order,
        OrderItem,
        Truck,
        Category,
        Product,
        Panier,
        Delivery,
        Chat,
        Comment,
        Notification,
        Devise,
      ],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false, // For self-signed certificates
        },
      },
    }),*/
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
