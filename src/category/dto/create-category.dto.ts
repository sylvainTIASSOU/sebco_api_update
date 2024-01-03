import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'name is requiered' })
  @IsString({ message: 'the name must be string' })
  readonly name: string;

  @IsOptional()
  @IsString({ message: 'the image must be string' })
  image: string;
}
