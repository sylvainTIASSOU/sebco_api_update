import { Chat } from 'src/chat/entities/chat.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Devise } from 'src/devise/entities/devise.entity';
import { Order } from 'src/order/entities/order.entity';
import { Panier } from 'src/panier/entities/panier.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  socity: string;

  @OneToOne(() => User, (us) => us.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (ord) => ord.customer)
  order: Order[];

  @OneToMany(() => Panier, (pan) => pan.customer)
  panier: Panier[];

  @OneToMany(() => Devise, (dev) => dev.customer)
  devise: Devise[];

  @OneToMany(() => Comment, (com) => com.customer)
  comment: Comment[];

  @OneToMany(() => Chat, (chat) => chat.customer)
  chat: Chat[];
}
