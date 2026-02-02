import { PartialType } from '@nestjs/mapped-types';
import { CreateAppoinmentDto } from './create-appoinment.dto';

export class UpdateAppoinmentDto extends PartialType(CreateAppoinmentDto) {}
