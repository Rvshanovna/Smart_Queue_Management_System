import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Roles } from 'src/enum';

@Injectable()
export class AdminScopeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const paramId = req.params?.id;

    if (user.role === Roles.SUPERADMIN) {
      return true;
    }
    if (user.role === Roles.ADMIN) {
      if (paramId && Number(paramId) === user.id) {
        return true;
      }
    }

    throw new ForbiddenException('Admin can access only own profile');
  }
}
