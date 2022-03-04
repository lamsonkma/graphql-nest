import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { OwnersService } from 'src/owners/owners.service';

export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly ownerService:OwnersService) {
    super();
  }
  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
