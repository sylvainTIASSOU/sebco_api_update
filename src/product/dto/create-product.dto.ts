import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  readonly name: string;

  @IsOptional({ message: '' })
  @IsNumber({}, { message: '' })
  readonly quantity: number;

  @IsNotEmpty({ message: '' })
  readonly image: string;

  @IsOptional()
  @IsString({ message: '' })
  readonly granulometrie: string;

  @IsOptional()
  @IsString({ message: '' })
  readonly forme: string;

  @IsOptional()
  @IsString({ message: '' })
  readonly couleur: string;

  @IsOptional()
  @IsString({ message: '' })
  readonly description: string;

  @IsOptional()
  @IsString({ message: '' })
  readonly usage: string;

  @IsOptional()
  @IsNumber({}, { message: '' })
  readonly priceUnit: number;

  @IsOptional()
  @IsNumber({}, { message: '' })
  readonly priceStock: number;

  @IsOptional()
  @IsNumber({}, { message: '' })
  readonly price6: number;

  @IsOptional()
  @IsNumber({}, { message: '' })
  readonly price10: number;

  @IsOptional()
  @IsNumber({}, { message: '' })
  readonly price12: number;

  @IsOptional()
  @IsNumber({}, { message: '' })
  readonly price14: number;

  @IsOptional()
  @IsNumber({}, { message: '' })
  readonly price16: number;

  @IsOptional()
  @IsNumber({}, { message: '' })
  readonly price20: number;

  @IsOptional()
  @IsNumber({}, { message: '' })
  readonly categorieId: number;
}
