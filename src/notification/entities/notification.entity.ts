import { Delivery } from 'src/delivery/entities/delivery.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  status: string;

  @CreateDateColumn()
  CreateAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Order, (order) => order.notification, { nullable: true })
  order: Order;

  @ManyToOne(() => Delivery, (del) => del.notification, { nullable: true })
  delivery: Delivery;
}
