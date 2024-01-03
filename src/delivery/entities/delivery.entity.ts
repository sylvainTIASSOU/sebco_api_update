import { Driver } from 'src/driver/entities/driver.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Order } from 'src/order/entities/order.entity';
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
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @ManyToOne(() => Driver, (dr) => dr.delivery)
  driver: Driver;

  @ManyToOne(() => Order, (ord) => ord.delivery)
  order: Order;

  @OneToMany(() => Notification, (notif) => notif.delivery)
  notification: Notification[];

  @CreateDateColumn()
  cerateAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
