import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviseDto } from './create-devise.dto';

export class UpdateDeviseDto extends PartialType(CreateDeviseDto) {}
