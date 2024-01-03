import { Customer } from 'src/customer/entities/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  contentSendTo: string;

  @Column({ nullable: true })
  contentSendBy: string;

  @ManyToOne(() => Customer, (cust) => cust.chat)
  customer: Customer;

  @CreateDateColumn()
  createAt: Date;
}
