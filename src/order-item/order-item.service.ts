import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class OrderItemService {
  constructor(
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
  ) {}

  @InjectRepository(OrderItem)
  private readonly orderItemRepository: Repository<OrderItem>;

  async create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = await this.orderItemRepository.create(createOrderItemDto);
    const product = await this.productService.findOne(
      createOrderItemDto.product_id,
    );
    orderItem.product = product;

    const order = await this.orderService.findOne(createOrderItemDto.order_id);
    orderItem.order = order;

    return await this.orderItemRepository.save(orderItem);
  }

  async findAll() {
    return await this.orderItemRepository.find({
      relations: ['product', 'order'],
    });
  }

  async findAllByOrder(id: number) {
    const order = await this.orderService.findOne(id);

    if (!order) {
      return [];
    }

    const items = await this.orderItemRepository.find({
      where: {
        order: order,
      },
      relations: ['order'],
    });
    return items;
  }

  async findOne(id: number) {
    const item = await this.orderItemRepository.findOneBy({ id });

    if (!item)
      throw new NotFoundException(`order Item whith id ${id}  note found`);
    return item;
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const item = await this.findOne(id);
    await this.orderItemRepository.merge(item, updateOrderItemDto);
    return await this.orderItemRepository.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.orderItemRepository.remove(item);
    return item;
  }

  async gerItemByOrder(id: number) {
    const items = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .select('orderItem', 'order_item')
      .addSelect('order.id', 'order_id')
      .from('orderItem', 'orderItem')
      .innerJoin('orderItem.order', 'order')
      .where('order.id = :id', {
        id: id,
      })
      .groupBy('orderItem.id')
      .addGroupBy('order.id')
      .getRawMany();

    return items;
  }
}
