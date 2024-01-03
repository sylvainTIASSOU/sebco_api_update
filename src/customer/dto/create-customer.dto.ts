import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'the first name must be string ' })
  @IsNotEmpty({ message: ' the first Name is reqiererd' })
  readonly firstName: string;

  @IsString({ message: 'the last name must be string ' })
  @IsNotEmpty({ message: 'the last name is reqiered ' })
  readonly lastName: string;

  @IsString({ message: ' the email must be string' })
  @IsNotEmpty({ message: 'the email is requiered ' })
  @IsEmail({}, { message: ' the email is invalide' })
  readonly email: string;

  @IsString({ message: ' the type must be string' })
  @IsNotEmpty({ message: ' the type is requiered' })
  readonly type: string;

  @IsOptional()
  @IsString({ message: ' the type must be string' })
  society: string;
}
