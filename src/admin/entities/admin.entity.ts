import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pseudo: string;

  @OneToOne(() => User, (us) => us.admin, { nullable: true })
  user: User;
}
