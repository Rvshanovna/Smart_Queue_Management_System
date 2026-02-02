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
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { AdminScopeGuard } from 'src/guard/admin-scope.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { AccessRoles } from 'src/decorator/roles.decorator';
import { Roles } from 'src/enum';

@Controller('specialty')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Post()
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtiesService.create(createSpecialtyDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Get()
  findAll() {
    return this.specialtiesService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialtiesService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto,
  ) {
    return this.specialtiesService.update(+id, updateSpecialtyDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialtiesService.remove(+id);
  }
}
