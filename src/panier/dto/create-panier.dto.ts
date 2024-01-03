import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePanierDto {
  @IsNotEmpty({ message: '' })
  @IsNumber({}, { message: '' })
  quantity: number;

  @IsNotEmpty({ message: '' })
  @IsNumber({}, { message: '' })
  price: number;

  @IsOptional()
  @IsString({ message: '' })
  utility: string;

  @IsOptional()
  @IsString({ message: '' })
  codePromo: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  city: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  quarter: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  laltitude: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  longitude: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  deliveryDate: string;

  @IsOptional()
  @IsString({ message: '' })
  deliveryHours: string;

  @IsOptional()
  @IsString({ message: '' })
  image: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  indiqueName: string;

  @IsNotEmpty({ message: '' })
  @IsNumber({}, { message: '' })
  indiqueNumber: number;

  @IsOptional()
  @IsNumber({}, { message: '' })
  readonly product_id: number;

  @IsOptional()
  @IsNumber({}, { message: '' })
  readonly customer_id: number;
}
