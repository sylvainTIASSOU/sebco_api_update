import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from 'src/utility/role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: "phone can't be empty " })
  @IsNumber({}, { message: 'phone is number' })
  readonly phone: number;

  @IsNotEmpty({ message: 'password is requiered' })
  @IsString({ message: 'password is string' })
  readonly password: string;

  @IsNotEmpty({ message: 'role is requiered' })
  @IsString({ message: 'role id string' })
  readonly role: RoleEnum;

  @IsOptional()
  @IsNumber({}, { message: 'admin id is a number' })
  readonly admin_id: number;

  @IsOptional()
  @IsNumber({}, { message: 'customer id is a number' })
  readonly customer_id: number;

  @IsOptional()
  @IsNumber({}, { message: 'driver id is a number' })
  readonly driver_id: number;
}
