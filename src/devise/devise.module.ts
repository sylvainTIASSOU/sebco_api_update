import { Module } from '@nestjs/common';
import { DeviseService } from './devise.service';
import { DeviseController } from './devise.controller';
import { Devise } from './entities/devise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Devise]), CustomerModule],
  controllers: [DeviseController],
  providers: [DeviseService],
})
export class DeviseModule {}
