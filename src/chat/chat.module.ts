import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { UsersModule } from 'src/users/users.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UsersModule, CustomerModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService, TypeOrmModule],
})
export class ChatModule {}
