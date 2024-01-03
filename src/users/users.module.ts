import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AdminModule } from 'src/admin/admin.module';
import { CustomerModule } from 'src/customer/customer.module';
import { DriverModule } from 'src/driver/driver.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AdminModule,
    CustomerModule,
    DriverModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
