import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('add')
  async create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return await this.deliveryService.create(createDeliveryDto);
  }

  @Get('all')
  async findAll() {
    return await this.deliveryService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.deliveryService.findOne(+id);
  }

  @Get('findByDriver/:id')
  async findByDriver(@Param('id') id: string, @Query('status') status: string) {
    return await this.deliveryService.getAllByStatusAndDriver(+id, status);
  }

  @Get('getAllByStatus/:status')
  async getAllByStatus(@Param('status') status: string) {
    return await this.deliveryService.getAllByStatus(status);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return await this.deliveryService.update(+id, updateDeliveryDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.deliveryService.remove(+id);
  }
}
