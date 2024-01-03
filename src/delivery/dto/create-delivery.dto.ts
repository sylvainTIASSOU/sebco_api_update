import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  readonly status: string;

  @IsNotEmpty({ message: '' })
  @IsNumber({}, { message: '' })
  readonly driver_id: number;

  @IsNotEmpty({ message: '' })
  @IsNumber({}, { message: '' })
  readonly order_id: number;
}
