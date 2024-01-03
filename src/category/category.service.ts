import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category)
      throw new NotFoundException(`category whith id ${id} not found `);
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const cat = await this.findOne(id);
    this.categoryRepository.merge(cat, updateCategoryDto);
    return await this.categoryRepository.save(cat);
  }

  async remove(id: number) {
    const cat = await this.findOne(id);
    await this.categoryRepository.remove(cat);
    return cat;
  }

  async getCategoryMaterials() {
    const cat = await this.categoryRepository
      .createQueryBuilder()
      .select('category.id', 'id')
      .addSelect('category.name', 'name')
      .addSelect('category.image', 'image')
      .from('category', 'category')
      .where(
        "category.name != 'sable' AND category.name != 'gravier' AND category.name != 'rembier'",
      )
      .groupBy('category.id')
      .distinctOn(['category.name'])
      .getRawMany();

    return cat;
  }
}
