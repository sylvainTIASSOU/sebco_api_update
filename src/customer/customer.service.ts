import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>;

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerRepository.create(createCustomerDto);

    return await this.customerRepository.save(customer);
  }

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(id: number) {
    const cust = await this.customerRepository.findOneBy({ id });
    if (!cust) throw new NotFoundException('customer not fund');
    return cust;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} ${updateCustomerDto} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
