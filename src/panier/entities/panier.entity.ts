import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Panier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column({ nullable: true })
  utility: string;

  @Column({ nullable: true })
  codePromo: string;

  @Column()
  city: string;

  @Column()
  quarter: string;

  @Column()
  laltitude: string;

  @Column()
  longitude: string;

  @Column()
  deliveryDate: string;

  @Column({ nullable: true })
  deliveryHours: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  indiqueName: string;

  @Column()
  indiqueNumber: number;

  @ManyToOne(() => Product, (pro) => pro.panier)
  product: Product;

  @ManyToOne(() => Customer, (cus) => cus.panier)
  customer: Customer;
}
