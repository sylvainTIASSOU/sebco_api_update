import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTruckDto {
  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  readonly marque: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  readonly matricule: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  readonly plaque: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  readonly photo: string;

  @IsOptional()
  @IsNumber({}, { message: 'truck id is a number' })
  driver_id: number;
}
