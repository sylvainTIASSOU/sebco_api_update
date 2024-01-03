import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrderService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @InjectRepository(Order)
  private readonly orderRepository: Repository<Order>;

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.create(createOrderDto);

    if (createOrderDto.custome_id) {
      const customer = await this.customerService.findOne(
        createOrderDto.custome_id,
      );
      order.customer = customer;
    }
    await this.orderRepository.save(order);
    this.eventEmitter.emit('order.save', order);
    return order;
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) throw new NotFoundException(`order whith id ${id} not found `);
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const ord = await this.findOne(id);
    await this.orderRepository.merge(ord, updateOrderDto);
    if (updateOrderDto.status == 'finish') {
      this.eventEmitter.emit('order.update1', updateOrderDto);
      return await this.orderRepository.save(ord);
    }
    this.eventEmitter.emit('order.update', updateOrderDto);
    return await this.orderRepository.save(ord);
  }

  async remove(id: number) {
    const ord = await this.findOne(id);
    await this.orderRepository.remove(ord);
    return ord;
  }

  async getOrderByStatus(status: string) {
    const order = await this.orderRepository.find({
      where: {
        status: status,
      },
      relations: ['customer'],
    });
    return order;
  }

  async getOrderByCustomer(id: number) {
    const order = await this.orderRepository
      .createQueryBuilder()
      .select('order', 'order')
      .addSelect('customer.id', 'id')
      .from('order', 'order')
      .innerJoin('order.customer', 'customer')
      .where('customer.id = :id ', {
        id: id,
      })
      .groupBy('order.id')
      .addGroupBy('customer.id')
      .getRawMany();

    return order;
  }

  async getOrderByCustomerHistory(id: number) {
    const order = await this.orderRepository
      .createQueryBuilder()
      .select('order', 'order')
      .addSelect('customer.id', 'id')
      .from('order', 'order')
      .innerJoin('order.customer', 'customer')
      .where('customer.id = :id AND order.status = :status ', {
        id: id,
        status: 'done',
      })
      .groupBy('order.id')
      .addGroupBy('customer.id')
      .getRawMany();

    return order;
  }
}
