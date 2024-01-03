import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('add')
  async create(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminService.create(createAdminDto);
  }

  @Get('all')
  async findAll() {
    return await this.adminService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.adminService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @Get('singleId/:pseudo')
  async getId(@Param('pseudo') pseudo: string) {
    return await this.adminService.findIdByPseudo(pseudo);
  }
}
