import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class PatientGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }
    if (user.role !== 'patient') {
      throw new ForbiddenException('Only patients can access this route');
    }
    const patientId = req.params?.id;
    if (patientId && user.id !== patientId) {
      throw new ForbiddenException('You can only modify your own data');
    }

    // Shu yerga kelib:
    // - user patient
    // - route id bo'lsa, faqat o'z idsi bilan kelgan
    // Shuningdek appointment yaratish ham patient uchun ruxsat
    return true;
  }
}
