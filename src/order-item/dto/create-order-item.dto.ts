import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty({ message: '' })
  @IsNumber({}, { message: '' })
  readonly quantity: number;

  @IsNotEmpty({ message: '' })
  @IsNumber({}, { message: '' })
  readonly product_id: number;

  @IsNotEmpty({ message: '' })
  @IsNumber({}, { message: '' })
  readonly order_id: number;
}
