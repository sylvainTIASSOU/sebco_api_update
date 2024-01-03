import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class ChatService {
  constructor(readonly customerService: CustomerService) {}

  @InjectRepository(Chat)
  readonly chatRepository: Repository<Chat>;

  async create(createChatDto: CreateChatDto) {
    const chat = await this.chatRepository.create(createChatDto);

    if (createChatDto.customer_id) {
      const customer = await this.customerService.findOne(
        createChatDto.customer_id,
      );
      chat.customer = customer;
    }

    const saved = await this.chatRepository.save(chat);
    return saved;
  }

  async findAll() {
    return await this.chatRepository.find({
      relations: ['receiver', 'sender'],
    });
  }

  async getUser() {
    const user = await this.chatRepository
      .createQueryBuilder()
      .select('chat.id', 'id')
      .addSelect('customer.id', 'customerId')
      .addSelect('customer.lastName', 'lastName')
      .addSelect('chat.contentSendTo', 'content')
      .addSelect('chat.contentSendBy', 'content')
      .from('chat', 'chat')
      .innerJoin('chat.customer', 'customer')
      .where('chat.contentSendBy IS NOT NULL')
      .groupBy('chat.id')
      .addGroupBy('customer.id')
      .getRawMany();
    return user;
  }

  async getMsgSendBy(id: number) {
    const msg = await this.chatRepository
      .createQueryBuilder()
      .select('chat.id', 'id')
      .addSelect('customer.id', 'customerId')
      .addSelect('customer.lastName', 'lastName')
      .addSelect('chat.createAt', 'createAt')
      .addSelect('chat.contentSendBy', 'content')
      .from('chat', 'chat')
      .innerJoin('chat.customer', 'customer')
      .where('customer.id = :id AND chat.content IS NOT NULL', { id: id })
      .groupBy('chat.id')
      .addGroupBy('customer.id')
      .getRawMany();
    return msg;
  }

  async getMsgSendTo(id: number) {
    const msg = await this.chatRepository
      .createQueryBuilder()
      .select('chat.id', 'id')
      .addSelect('customer.id', 'customerId')
      .addSelect('customer.lastName', 'lastName')
      .addSelect('chat.createAt', 'createAt')
      .addSelect('chat.contentSendTo', 'content')
      .from('chat', 'chat')
      .innerJoin('chat.customer', 'customer')
      .where('customer.id = :id AND chat.content IS NOT NULL', { id: id })
      .groupBy('chat.id')
      .addGroupBy('customer.id')
      .getRawMany();
    return msg;
  }

  async findOne(id: number) {
    const chat = await this.chatRepository.findOneBy({ id });
    if (!chat) throw new NotFoundException('');
    return chat;
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} ${updateChatDto} chat`;
  }

  async remove(id: number) {
    const chat = await this.findOne(id);
    return await this.chatRepository.delete(chat);
  }
}
