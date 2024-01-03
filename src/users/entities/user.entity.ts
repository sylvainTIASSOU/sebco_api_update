import { Admin } from 'src/admin/entities/admin.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Driver } from 'src/driver/entities/driver.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: number;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToOne(() => Admin, (ad) => ad.user, { nullable: true })
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @OneToOne(() => Driver, (ad) => ad.user, { nullable: true })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @OneToOne(() => Customer, (ad) => ad.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
