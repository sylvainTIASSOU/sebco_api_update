import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add')
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get('getPrice/:id')
  async getPrice(@Param('id') id: string) {
    return await this.productService.getPrice(+id);
  }

  @Get('getProduct/:name')
  async getProductByCatName(@Param('name') name: string) {
    return await this.productService.getProductByCatName(name);
  }
  @Get('all')
  async findAll() {
    return await this.productService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(+id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(+id, updateProductDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(+id);
  }
}
