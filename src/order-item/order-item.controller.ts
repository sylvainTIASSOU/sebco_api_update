import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post('add')
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return await this.orderItemService.create(createOrderItemDto);
  }

  @Get('all')
  async findAll() {
    return await this.orderItemService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.orderItemService.findOne(+id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return await this.orderItemService.update(+id, updateOrderItemDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.orderItemService.remove(+id);
  }

  @Get('getByOrder/:id')
  async getByOrder(@Param('id') id: string) {
    return await this.orderItemService.gerItemByOrder(+id);
  }
}
