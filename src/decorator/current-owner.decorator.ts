import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
export const CurrentOwner: any = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      return request.currentOwner;
    }
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.currentOwner;
  },
);
