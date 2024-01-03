import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { ProductModule } from 'src/product/product.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem]), ProductModule, OrderModule],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService, TypeOrmModule],
})
export class OrderItemModule {}
