import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('add')
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationService.create(createNotificationDto);
  }

  @Get('all')
  async findAll() {
    return await this.notificationService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.notificationService.findOne(+id);
  }

  @Get('getNotificationByCustomer/:id')
  async getNotifByCust(@Param('id') id: string) {
    return await this.notificationService.getNotificationByCustomer(+id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return await this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.notificationService.remove(+id);
  }
}
