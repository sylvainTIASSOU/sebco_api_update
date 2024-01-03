import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString({ message: '' })
  @IsNotEmpty({ message: '' })
  content: string;

  @IsString({ message: '' })
  @IsNotEmpty({ message: '' })
  status: string;

  @IsNumber({}, { message: '' })
  @IsOptional()
  order_id: number;

  @IsNumber({}, { message: '' })
  @IsOptional()
  delivery_id: number;
}
