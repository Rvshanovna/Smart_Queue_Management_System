import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Roles } from 'src/enum';

@Injectable()
export class DoctorSelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const doctorId = +request.params.id;

    if (user.role === Roles.SUPERADMIN || user.role === Roles.ADMIN)
      return true;

    if (user.role === Roles.DOCTOR && user.id === doctorId) return true;
    throw new ForbiddenException('Not allowed');
  }
}
