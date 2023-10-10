import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';

@Injectable()
export class AspectLogger implements NestInterceptor {
  private readonly logger = new Logger('ReportService');
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { originalUrl, method } = req;
    this.logger.log(`url:${originalUrl}, method:${method}`);
    return next.handle();
  }
}
