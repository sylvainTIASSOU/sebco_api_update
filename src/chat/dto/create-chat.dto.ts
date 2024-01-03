import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @IsOptional()
  @IsString({ message: '' })
  readonly contentSendTo: string;

  @IsOptional()
  @IsString({ message: '' })
  readonly contentSendBy: string;

  @IsNumber({}, { message: '' })
  @IsOptional()
  readonly customer_id: number;
}
