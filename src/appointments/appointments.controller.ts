import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { PatientGuard } from 'src/guard/patient.guard';
import { AccessRoles } from 'src/decorator/roles.decorator';
import { Roles } from 'src/enum';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(AuthGuard, PatientGuard)
  @AccessRoles(Roles.PATIENT)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @UseGuards(AuthGuard, PatientGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.DOCTOR)
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @UseGuards(AuthGuard, PatientGuard)
  @AccessRoles(Roles.PATIENT, Roles.ADMIN, Roles.DOCTOR, Roles.SUPERADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @UseGuards(AuthGuard, PatientGuard)
  @AccessRoles(Roles.PATIENT, Roles.ADMIN, Roles.DOCTOR, Roles.SUPERADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @UseGuards(AuthGuard, PatientGuard)
  @AccessRoles(Roles.PATIENT, Roles.ADMIN, Roles.DOCTOR, Roles.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
