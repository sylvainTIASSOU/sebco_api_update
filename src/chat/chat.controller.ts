import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('add')
  async create(@Body() createChatDto: CreateChatDto) {
    return await this.chatService.create(createChatDto);
  }

  @Get('all')
  async findAll() {
    return await this.chatService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.chatService.findOne(+id);
  }

  @Get('getMsgSendTo/:id')
  async getMsgSendTo(@Param('id') id: string) {
    return await this.chatService.getMsgSendTo(+id);
  }

  @Get('getMsgSendBy/:id')
  async getMsgSendBy(@Param('id') id: string) {
    return await this.chatService.getMsgSendBy(+id);
  }

  @Get('getSenders')
  async getSenders() {
    return await this.chatService.getUser();
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return await this.chatService.update(+id, updateChatDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.chatService.remove(+id);
  }
}
