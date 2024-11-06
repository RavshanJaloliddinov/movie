import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RequestInterface } from '../user/check-auth.guard';
import { UserRoles } from 'src/common/database/Enums';
import { Roles } from 'src/api/auth/roles/RolesDecorator';


@Injectable()
export class CheckRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestInterface>();
    const roles: string[] = this.reflector.get<string[]>(Roles, context.getHandler()) || [];

    // Agar rol User bo'lsa va ro'yxatda rollar bo'lmasa, ruxsat beramiz
    if (request.role === UserRoles.USER && !roles.length) {
      return true;
    }

    // Agar ro'yxat bo'lmasa yoki foydalanuvchi rolini ro'yxatda topilmasa
    if (!roles.length || !roles.includes(request.role)) {
      throw new NotAcceptableException("User doesn't have permission to this endpoint");
    }

    return true;
  }
}
