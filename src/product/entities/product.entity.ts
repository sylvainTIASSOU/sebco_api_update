import { Category } from 'src/category/entities/category.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Panier } from 'src/panier/entities/panier.entity';
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
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  granulometrie: string;

  @Column({ nullable: true })
  forme: string;

  @Column({ nullable: true })
  couleur: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  usage: string;

  @Column({ nullable: true })
  priceUnit: number;

  @Column({ nullable: true })
  priceStock: number;

  @Column({ nullable: true })
  price6: number;

  @Column({ nullable: true })
  price10: number;

  @Column({ nullable: true })
  price12: number;

  @Column({ nullable: true })
  price14: number;

  @Column({ nullable: true })
  price16: number;

  @Column({ nullable: true })
  price20: number;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  product: Category;

  @OneToMany(() => OrderItem, (ordit) => ordit.order)
  orderItem: OrderItem[];

  @OneToMany(() => Panier, (pan) => pan.product)
  panier: Panier[];
}
