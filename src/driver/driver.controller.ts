import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('add')
  async create(@Body() createDriverDto: CreateDriverDto) {
    return await this.driverService.create(createDriverDto);
  }

  @Get('all')
  async findAll() {
    return await this.driverService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return this.driverService.findOne(+id);
  }

  @Get('getDriverBStatus/:status')
  async getDriverBStatuse(@Param('status') status: string) {
    return this.driverService.getDriverBStatus(status);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return await this.driverService.update(+id, updateDriverDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.driverService.remove(+id);
  }
}
