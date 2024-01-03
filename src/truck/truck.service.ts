import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Truck } from './entities/truck.entity';
import { Repository } from 'typeorm';
import { DriverService } from 'src/driver/driver.service';

@Injectable()
export class TruckService {
  constructor(private readonly driverService: DriverService) {}
  @InjectRepository(Truck)
  private readonly truckRepository: Repository<Truck>;

  async create(createTruckDto: CreateTruckDto) {
    const truck = await this.truckRepository.create(createTruckDto);
    if (createTruckDto.driver_id) {
      const driver = await this.driverService.findOne(createTruckDto.driver_id);
      truck.driver = driver;
    }
    return await this.truckRepository.save(truck);
  }

  async findAll() {
    return await this.truckRepository.find();
  }

  async findOne(id: number) {
    const truck = await this.truckRepository.findOneBy({ id });

    if (!truck) throw new NotFoundException(`truck whith ${id} not existe`);
    return truck;
  }

  async update(id: number, updateTruckDto: UpdateTruckDto) {
    const truck = await this.findOne(id);
    this.truckRepository.merge(truck, updateTruckDto);
    return await this.truckRepository.save(truck);
  }

  async remove(id: number) {
    const truck = await this.findOne(id);
    this.truckRepository.remove(truck);
    return truck;
  }

  async getAll() {
    const tr = await this.truckRepository
      .createQueryBuilder()
      .select('truck.id', 'truckID')
      .addSelect('truck.plaque', 'plaque')
      .addSelect('truck.dimension', 'dimension')
      .addSelect('driver.id', 'id')
      .addSelect('driver.firstName', 'firstName')
      .addSelect('driver.lastaName', 'lastaName')
      .addSelect('driver.location', 'location')
      .addSelect('driver.status', 'status')
      .addSelect('driver.photo', 'photo')
      .from('truck', 'truck')
      .innerJoin('truck.driver', 'driver')
      .groupBy('truck.id')
      .getRawMany();
    return tr;
  }

  async getAllByStatus(status: string) {
    const tr = await this.truckRepository
      .createQueryBuilder()
      .select('truck.id', 'truckID')
      .addSelect('truck.plaque', 'plaque')
      .addSelect('truck.dimension', 'dimension')
      .addSelect('driver.id', 'id')
      .addSelect('driver.firstName', 'firstName')
      .addSelect('driver.lastaName', 'lastaName')
      .addSelect('driver.location', 'location')
      .addSelect('driver.status', 'status')
      .addSelect('driver.photo', 'photo')
      .from('truck', 'truck')
      .innerJoin('truck.driver', 'driver')
      .where('driver.status= :status', { status: status })
      .groupBy('truck.id')
      .getRawMany();
    return tr;
  }
}
