import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(private readonly categoryService: CategoryService) {}

  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);

    if (createProductDto.categorieId) {
      const cat = await this.categoryService.findOne(
        createProductDto.categorieId,
      );
      product.category = cat;
    }
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: number) {
    const prod = await this.productRepository.findOneBy({ id });

    if (!prod) throw new NotFoundException(`product whith id ${id} not found `);
    return prod;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    this.productRepository.remove(product);
    return product;
  }

  async getProductByCatName(name: string) {
    const product = await this.productRepository
      .createQueryBuilder()
      .select('product.name', 'product_name')
      .addSelect('product.image', 'image')
      .addSelect('product.id', 'id')
      .addSelect('product.granulometrie', 'granulometrie')
      .addSelect('product.forme', 'forme')
      .addSelect('product.couleur', 'couleur')
      .addSelect('product.description', 'description')
      .addSelect('product.usage', 'usage')
      .addSelect('product.priceStock', 'priceStock')
      .addSelect('product.price6', 'price6')
      .addSelect('product.price10', 'price10')
      .addSelect('product.price12', 'price12')
      .addSelect('product.price14', 'price14')
      .addSelect('product.price16', 'price16')
      .addSelect('product.price20', 'price20')
      .addSelect('product.quantity', 'quantity')
      .addSelect('product.priceUnit', 'price')
      .addSelect('category.id', 'idCat')
      .addSelect('category.name', 'cate_name')
      .from('product', 'product')
      .innerJoin('product.category', 'category')
      .where('category.name = :name', { name: name })
      .groupBy('product.id')
      .addGroupBy('category.id')
      .getRawMany();
    return product;
  }

  async getPrice(id: number) {
    const productPrice = await this.productRepository
      .createQueryBuilder()
      .select('product.price6', 'price6')
      .addSelect('product.price10', 'price10')
      .addSelect('product.price12', 'price10')
      .addSelect('product.price14', 'price14')
      .addSelect('product.price16', 'price18')
      .addSelect('product.price20', 'price20')
      .from('product', 'product')
      .where('product.id = :id', { id: id })
      .getRawMany();
    return productPrice;
  }
}
