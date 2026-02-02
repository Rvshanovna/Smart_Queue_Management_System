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
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { RoleGuard } from 'src/guard/role.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/enum';
import { AccessRoles } from 'src/decorator/roles.decorator';
import { DoctorSelfGuard } from 'src/guard/doctor.guard';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard, DoctorSelfGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.DOCTOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard, DoctorSelfGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.DOCTOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }
}
