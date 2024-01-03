import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty({ message: 'pseudo is not empty' })
  @IsString({ message: 'pseudo is string' })
  pseudo: string;
}
