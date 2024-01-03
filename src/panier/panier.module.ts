import { Module } from '@nestjs/common';
import { PanierService } from './panier.service';
import { PanierController } from './panier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panier } from './entities/panier.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Panier]), ProductModule, CustomerModule],
  controllers: [PanierController],
  providers: [PanierService],
})
export class PanierModule {}
