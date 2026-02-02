import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { RoleGuard } from 'src/guard/role.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { AdminScopeGuard } from 'src/guard/admin-scope.guard';
import { Roles } from 'src/enum';
import { AccessRoles } from 'src/decorator/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { PatientGuard } from 'src/guard/patient.guard';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @UseGuards(AuthGuard, RoleGuard, AdminScopeGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard, AdminScopeGuard, PatientGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.PATIENT)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @UseGuards(AuthGuard, RoleGuard, AdminScopeGuard, PatientGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.PATIENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
