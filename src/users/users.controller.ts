import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import LoginDto from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getAdmin')
  async getAdmin() {
    return await this.usersService.getUserAdmin();
  }

  @Get('getCustomer')
  async getCustomer() {
    return await this.usersService.getUserCustomer();
  }

  @Get('getDriver')
  async getDriver() {
    return await this.usersService.getUserdriver();
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.usersService.login(loginDto);
  }

  @Post('add')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('all')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('getCustomerByUserId/:id')
  async getCustomerByUserId(@Param('id') id: string) {
    return await this.usersService.getCustomerByUserId(+id);
  }

  @Get('getAdminByUserId/:id')
  async getAdminByUserId(@Param('id') id: string) {
    return await this.usersService.getAdminByUserId(+id);
  }

  @Get('getdriverByUserId/:id')
  async getdriverByUserId(@Param('id') id: string) {
    return await this.usersService.getdriverByUserId(+id);
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Get('findByPhone/:phone')
  async findByPhone(@Param('phone') phone: string) {
    return await this.usersService.findByPhone(+phone);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
