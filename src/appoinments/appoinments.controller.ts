// src/appointments/appointments.controller.ts
import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { PatientGuard } from 'src/guard/patient.guard';
import { AppointmentsService } from './appoinments.service';
import { CreateAppointmentDto } from './dto/create-appoinment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}
  @UseGuards(AuthGuard, PatientGuard)
  @Post()
  create(@Req() req, @Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(req.user.id, dto);
  }
  @UseGuards(AuthGuard, PatientGuard)
  @Get('me')
  getMyAppointment(@Req() req) {
    return this.appointmentsService.findByPatient(req.user.id);
  }
}
