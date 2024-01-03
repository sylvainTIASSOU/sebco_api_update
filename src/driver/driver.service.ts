import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {
  @InjectRepository(Driver)
  private readonly driverRepository: Repository<Driver>;

  async create(createDriverDto: CreateDriverDto) {
    const driver = await this.driverRepository.create(createDriverDto);
    return await this.driverRepository.save(driver);
  }

  async findAll() {
    return await this.driverRepository.find();
  }

  async findOne(id: number) {
    const driver = await this.driverRepository.findOneBy({ id });
    if (!driver)
      throw new NotFoundException(`driver whith id= ${id} not found`);
    return driver;
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.findOne(id);
    this.driverRepository.merge(driver, updateDriverDto);
    return await this.driverRepository.save(driver);
  }

  async remove(id: number) {
    const driver = await this.findOne(id);
    await this.driverRepository.remove(driver);
    return `This action removes a #${id} driver`;
  }

  async getDriverBStatus(status: string) {
    const driver = await this.driverRepository.find({
      where: {
        status: status,
      },
    });

    return driver;
  }
}
