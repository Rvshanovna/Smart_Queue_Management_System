import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/enum';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { AccessRoles } from 'src/decorator/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminScopeGuard } from 'src/guard/admin-scope.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @AccessRoles(Roles.SUPERADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto, Roles.ADMIN);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @AccessRoles(Roles.SUPERADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard, AdminScopeGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @UseGuards(AuthGuard, RoleGuard, AdminScopeGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateUser(id, updateUserDto, file);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @AccessRoles(Roles.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
