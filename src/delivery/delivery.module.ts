import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { OrderModule } from 'src/order/order.module';
import { DriverModule } from 'src/driver/driver.module';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery]), DriverModule, OrderModule],
  controllers: [DeliveryController],
  providers: [DeliveryService],
  exports: [DeliveryService, TypeOrmModule],
})
export class DeliveryModule {}
