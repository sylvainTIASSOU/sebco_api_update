import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('add')
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(createCommentDto);
  }

  @Get('all')
  async findAll() {
    return await this.commentService.findAll();
  }

  @Get('getComment')
  async getComment() {
    return await this.commentService.getComment();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.commentService.findOne(+id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.update(+id, updateCommentDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.commentService.remove(+id);
  }
}
