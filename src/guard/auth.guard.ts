import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  CanActivate,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { envConfig } from 'src/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;
    if (!auth) {
      throw new UnauthorizedException('Unauthorized');
    }
    const bearer = auth.split(' ')[0];
    const token = auth.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Unauthorized');
    }
    try {
      const data = this.jwt.verify(token, {
        secret: envConfig.TOKEN_KEY,
      });
      if (!data || !data.isActive) {
        throw new UnauthorizedException('Token expired or user is not active');
      }
      req.user = data;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token expired');
    }
  }
}
