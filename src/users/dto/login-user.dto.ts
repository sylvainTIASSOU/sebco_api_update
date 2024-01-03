import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class LoginDto {
  @IsNotEmpty({ message: '' })
  @IsNumber({}, { message: '' })
  readonly phone: number;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  readonly password: string;
}
