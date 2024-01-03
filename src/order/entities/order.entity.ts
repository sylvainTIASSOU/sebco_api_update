import { Exclude } from 'class-transformer';
import { Customer } from 'src/customer/entities/customer.entity';
import { Delivery } from 'src/delivery/entities/delivery.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  quarter: string;

  @Column({ nullable: true })
  laltitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  deliveryDate: string;

  @Column({ nullable: true })
  indiqueName: string;

  @Column({ nullable: true })
  indiqueNumber: number;

  @Column({ nullable: true })
  deliveryHours: string;

  @Column({ nullable: true })
  utility: string;

  @Column({ nullable: true })
  codePromo: string;

  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => Customer, (cost) => cost.order)
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @OneToMany(() => Delivery, (del) => del.order)
  delivery: Delivery[];

  @OneToMany(() => Notification, (notif) => notif.order)
  notification: Notification;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
