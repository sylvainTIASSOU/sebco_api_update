import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  readonly status: string;

  @IsOptional()
  @IsNumber({}, { message: '' })
  readonly custome_id: number;

  @IsOptional()
  @IsNumber({}, { message: '' })
  quantity: number;

  @IsOptional()
  @IsNumber({}, { message: '' })
  price: number;

  @IsOptional()
  @IsString({ message: '' })
  city: string;

  @IsOptional()
  @IsString({ message: '' })
  quarter: string;

  @IsOptional()
  @IsString({ message: '' })
  laltitude: string;

  @IsOptional()
  @IsString({ message: '' })
  longitude: string;

  @IsOptional()
  @IsString({ message: '' })
  deliveryDate: string;

  @IsOptional()
  @IsString({ message: '' })
  indiqueName: string;

  @IsOptional()
  @IsNumber({}, { message: '' })
  indiqueNumber: number;

  @IsOptional()
  @IsString({ message: '' })
  deliveryHours: string;

  @IsOptional()
  @IsString({ message: '' })
  utility: string;

  @IsOptional()
  @IsString({ message: '' })
  codePromo: string;

  @IsOptional()
  @IsString({ message: '' })
  image?: string;
}
