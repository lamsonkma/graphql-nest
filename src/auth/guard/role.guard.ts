import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../decorator/roles.decorator';
import { UserRole } from 'src/owners/entities/owner.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requireRoles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const owner = ctx.getContext().req.user;
    return requireRoles.some((role) => owner.role.includes(role));
  }
}
