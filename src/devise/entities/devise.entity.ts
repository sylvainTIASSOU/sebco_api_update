import { Customer } from 'src/customer/entities/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Devise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  address: string;

  @Column()
  postal: string;

  @Column()
  ville: string;

  @Column()
  societe: string;

  @Column()
  demande: string;

  @CreateDateColumn()
  createAt: Date;

  @ManyToOne(() => Customer, (cust) => cust.devise)
  customer: Customer;
}
