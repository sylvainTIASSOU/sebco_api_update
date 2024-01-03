import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePanierDto } from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Panier } from './entities/panier.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class PanierService {
  constructor(
    private readonly productService: ProductService,
    private readonly customerService: CustomerService,
  ) {}

  @InjectRepository(Panier)
  private readonly panierRepository: Repository<Panier>;

  async create(createPanierDto: CreatePanierDto) {
    const panier = this.panierRepository.create(createPanierDto);

    if (createPanierDto.product_id) {
      const product = await this.productService.findOne(
        createPanierDto.product_id,
      );
      panier.product = product;
    }
    if (createPanierDto.customer_id) {
      const customer = await this.customerService.findOne(
        createPanierDto.customer_id,
      );
      panier.customer = customer;
    }
    return await this.panierRepository.save(panier);
  }

  async findAll() {
    return await this.panierRepository.find({
      relations: ['product', 'customer'],
    });
  }

  async findOne(id: number) {
    const panier = await this.panierRepository.findOneBy({ id });

    if (!panier) throw new NotFoundException('');
    return panier;
  }

  async update(id: number, updatePanierDto: UpdatePanierDto) {
    return `This action updates a #${id} ${updatePanierDto} panier`;
  }

  async remove(id: number) {
    const pan = await this.findOne(id);
    await this.panierRepository.remove(pan);
    return pan;
  }

  async getPanierByCustomerId(id: number) {
    const panier = await this.panierRepository
      .createQueryBuilder()
      .select('panier', 'panier')
      .addSelect('product.image', 'image')
      .addSelect('product.name', 'name')
      .addSelect('product.id', 'id')
      .from('panier', 'panier')
      .innerJoin('panier.product', 'product')
      .innerJoin('panier.customer', 'customer')
      .where('customer.id = :id', { id: id })
      .groupBy('panier.id')
      .addGroupBy('product.id')
      .getRawMany();

    return panier;
  }

  async getPanierByCustomer(id: number) {
    const panier = await this.panierRepository
      .createQueryBuilder()
      .select('panier', 'panier')
      .addSelect('SUM(panier.price)', 'totalPrice')
      .from('panier', 'panier')
      .innerJoin('panier.customer', 'customer')
      .where('customer.id = :id', { id: id })
      .groupBy('customer.id')
      .addGroupBy('panier.id')
      .getRawOne();

    return panier;
  }
}
