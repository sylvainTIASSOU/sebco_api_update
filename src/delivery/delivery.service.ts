import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Repository } from 'typeorm';
import { DriverService } from 'src/driver/driver.service';
import { OrderService } from 'src/order/order.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class DeliveryService {
  constructor(
    private readonly driverService: DriverService,
    private readonly orderService: OrderService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @InjectRepository(Delivery)
  private readonly deliveryRepository: Repository<Delivery>;

  async create(createDeliveryDto: CreateDeliveryDto) {
    const delivery = await this.deliveryRepository.create(createDeliveryDto);
    const order = await this.orderService.findOne(createDeliveryDto.order_id);
    const driver = await this.driverService.findOne(
      createDeliveryDto.driver_id,
    );

    delivery.driver = driver;
    delivery.order = order;
    await this.deliveryRepository.save(delivery);
    this.eventEmitter.emit('delivery.save', delivery);
    return delivery;
  }

  async findAll() {
    return await this.deliveryRepository.find({
      relations: ['driver', 'order'],
    });
  }

  async findOne(id: number) {
    const del = await this.deliveryRepository.findOneBy({ id });

    if (!del) throw new NotFoundException('delivery not found');
    return del;
  }

  async findByDriver(id: number, status: string) {
    const driver = await this.driverService.findOne(id);
    const deli = await this.deliveryRepository.find({
      where: {
        driver: driver,
        status: status,
      },
      relations: ['order'],
    });
    return deli;
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    const del = await this.findOne(id);
    await this.deliveryRepository.merge(del, updateDeliveryDto);

    const deliv = await this.deliveryRepository.save(del);
    this.eventEmitter.emit('delivery.save', deliv);

    return deliv;
  }

  async remove(id: number) {
    const del = await this.findOne(id);
    await this.deliveryRepository.remove(del);
    return del;
  }

  async getAllByStatus(status: string) {
    const del = await this.deliveryRepository
      .createQueryBuilder()
      .select('delivery.id', 'deliveryId')
      .addSelect('order.id', 'id')
      .addSelect('order.createAt', 'orderDate')
      .addSelect('order.deliveryDate', ' deliveryDate')
      .addSelect('order.deliveryHours', 'deliveryHours')
      .addSelect('order.customer', 'customer')
      .from('delivery', 'delivery')
      .innerJoin('delivery.order', 'order')
      .where('delivery.status = :status', { status: status })
      .groupBy('delivery.id')
      .addGroupBy('order.id')
      .getRawMany();
    return del;
  }

  async getAllByStatusAndDriver(id: number, status: string) {
    const del = await this.deliveryRepository
      .createQueryBuilder()
      .select('delivery.id', 'deliveryId')
      .addSelect('order.id', 'id')
      .addSelect('order.createAt', 'orderDate')
      .addSelect('order.deliveryDate', ' deliveryDate')
      .addSelect('order.deliveryHours', 'deliveryHours')
      .addSelect('order.customer', 'customer')
      .from('delivery', 'delivery')
      .innerJoin('delivery.order', 'order')
      .innerJoin('delivery.driver', 'driver')
      .where('driver.id = :id AND delivery.status = :status', {
        id: id,
        status: status,
      })
      .groupBy('delivery.id')
      .addGroupBy('driver.id')
      .addGroupBy('order.id')
      .getRawMany();
    return del;
  }
}
