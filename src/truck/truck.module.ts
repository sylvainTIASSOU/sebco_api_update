import { Module } from '@nestjs/common';
import { TruckService } from './truck.service';
import { TruckController } from './truck.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Truck } from './entities/truck.entity';
import { DriverModule } from 'src/driver/driver.module';

@Module({
  imports: [TypeOrmModule.forFeature([Truck]), DriverModule],
  controllers: [TruckController],
  providers: [TruckService],
  exports: [TruckService, TypeOrmModule],
})
export class TruckModule {}
