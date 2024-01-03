import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeviseDto {
  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  name: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  lastName: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  email: string;

  @IsNotEmpty({ message: '' })
  @IsNumber({}, { message: '' })
  phone: number;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  address: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  postal: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  ville: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  societe: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  demande: string;

  @IsNotEmpty({ message: '' })
  @IsNumber({}, { message: '' })
  customer_id: number;
}
