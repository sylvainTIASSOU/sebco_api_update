import { Delivery } from 'src/delivery/entities/delivery.entity';
import { Truck } from 'src/truck/entities/truck.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  status: string;

  @OneToOne(() => User, (us) => us.driver, { nullable: true })
  user: User;

  @OneToMany(() => Truck, (tr) => tr.driver, { nullable: true })
  truck: Truck[];

  @OneToMany(() => Delivery, (del) => del.driver)
  delivery: Delivery[];
}
