import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get('all')
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(+id);
  }

  @Get('getCategoryMaterials')
  async getCategoryMaterials() {
    return await this.categoryService.getCategoryMaterials();
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(+id);
  }
}
