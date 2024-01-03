import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TruckService } from './truck.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';

@Controller('truck')
export class TruckController {
  constructor(private readonly truckService: TruckService) {}

  @Post('add')
  async create(@Body() createTruckDto: CreateTruckDto) {
    return await this.truckService.create(createTruckDto);
  }

  @Get('all')
  async findAll() {
    return await this.truckService.findAll();
  }
  @Get('getAll')
  async getAll() {
    return await this.truckService.getAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.truckService.findOne(+id);
  }

  @Get('getAllByStatus/:status')
  async getAllByStatus(@Param('status') status: string) {
    return await this.truckService.getAllByStatus(status);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateTruckDto: UpdateTruckDto,
  ) {
    return await this.truckService.update(+id, updateTruckDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.truckService.remove(+id);
  }
}
