import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeviseService } from './devise.service';
import { CreateDeviseDto } from './dto/create-devise.dto';
import { UpdateDeviseDto } from './dto/update-devise.dto';

@Controller('devise')
export class DeviseController {
  constructor(private readonly deviseService: DeviseService) {}

  @Post('add')
  async create(@Body() createDeviseDto: CreateDeviseDto) {
    return await this.deviseService.create(createDeviseDto);
  }

  @Get('all')
  async findAll() {
    return await this.deviseService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.deviseService.findOne(+id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDeviseDto: UpdateDeviseDto,
  ) {
    return await this.deviseService.update(+id, updateDeviseDto);
  }

  @Delete('remove:id')
  async remove(@Param('id') id: string) {
    return await this.deviseService.remove(+id);
  }
}
