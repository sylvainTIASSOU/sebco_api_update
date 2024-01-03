import { Driver } from 'src/driver/entities/driver.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Truck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marque: string;

  @Column()
  matricule: string;

  @Column()
  plaque: string;

  @Column()
  photo: string;

  @ManyToOne(() => Driver, (dr) => dr.truck)
  driver: Driver;
}
