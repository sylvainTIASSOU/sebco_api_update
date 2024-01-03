import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString({ message: '' })
  @IsNotEmpty({ message: '' })
  content: string;

  @IsNumber({}, { message: '' })
  @IsNotEmpty({ message: '' })
  rating: number;

  @IsNumber({}, { message: '' })
  @IsNotEmpty({ message: '' })
  customer_id: number;
}
