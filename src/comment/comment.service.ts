import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CustomerService } from 'src/customer/customer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(readonly customerService: CustomerService) {}

  @InjectRepository(Comment)
  readonly commentRepository: Repository<Comment>;
  async create(createCommentDto: CreateCommentDto) {
    const comment = await this.commentRepository.create(createCommentDto);
    if (createCommentDto.customer_id) {
      const customer = await this.customerService.findOne(
        createCommentDto.customer_id,
      );
      comment.customer = customer;
    }
    return await this.commentRepository.save(comment);
  }

  async findAll() {
    return await this.commentRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const com = await this.commentRepository.findOneBy({ id });
    if (!com) throw new NotFoundException('comment not found');
    return com;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} ${updateCommentDto} comment`;
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    return await this.commentRepository.delete(comment);
  }

  async getComment() {
    const comment = await this.commentRepository
      .createQueryBuilder()
      .select('comment.content', 'content')
      .addSelect('comment.rating', 'rating')
      .addSelect('customer.firstName', 'name')
      .from('comment', 'comment')
      .innerJoin('comment.customer', 'customer')
      .getRawMany();
    return comment;
  }
}
