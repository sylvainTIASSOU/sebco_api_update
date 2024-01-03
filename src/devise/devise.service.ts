import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviseDto } from './dto/create-devise.dto';
import { UpdateDeviseDto } from './dto/update-devise.dto';
import { Devise } from './entities/devise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class DeviseService {
  constructor(private readonly customerService: CustomerService) {}
  @InjectRepository(Devise)
  readonly deviseRepository: Repository<Devise>;
  async create(createDeviseDto: CreateDeviseDto) {
    const devis = await this.deviseRepository.create(createDeviseDto);
    const customer = await this.customerService.findOne(
      createDeviseDto.customer_id,
    );

    devis.customer = customer;
    return await this.deviseRepository.save(devis);
  }

  async findAll() {
    return await this.deviseRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const devis = await this.deviseRepository.findOne({
      where: {
        id: id,
      },
      relations: ['customer'],
    });
    if (!devis) throw new NotFoundException('devis not found');
    return devis;
  }

  async update(id: number, updateDeviseDto: UpdateDeviseDto) {
    return `This action updates a #${id} ${updateDeviseDto}devise`;
  }

  async remove(id: number) {
    return `This action removes a #${id} devise`;
  }
}
