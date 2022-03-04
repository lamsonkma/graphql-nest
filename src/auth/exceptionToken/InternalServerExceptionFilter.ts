import {
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class InternalServerExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    switch (exception.name) {
      case 'UnauthorizedException': {
        console.log(response.status);
        return response.status;
      }
      case 'TokenExpiredError': {
        console.log('het han');
      }
      default: {
        console.log('j');
      }
    }
  }
}
