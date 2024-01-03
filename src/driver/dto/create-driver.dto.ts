import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDriverDto {
  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  readonly firstName: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  readonly lastName: string;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  readonly location: string;

  @IsOptional()
  @IsString({ message: '' })
  readonly photo: string;

  @IsOptional()
  @IsString({ message: '' })
  status: string;
}
