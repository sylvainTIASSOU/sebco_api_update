import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('add')
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get('all')
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Get('getOrderByStatus/:status')
  async getOrderByStatus(@Param('status') status: string) {
    return this.orderService.getOrderByStatus(status);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(+id, updateOrderDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(+id);
  }

  @Get('getOrderByCustomer/:id')
  async getOrderByCustomer(@Param('id') id: string) {
    return await this.orderService.getOrderByCustomer(+id);
  }

  @Get('getOrderByCustomerHistory/:id')
  async getOrderByCustomerHistory(@Param('id') id: string) {
    return await this.orderService.getOrderByCustomerHistory(+id);
  }
}
