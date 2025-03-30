import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as requestIp from 'request-ip';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { headers, query, params } = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message: unknown = exception['response'] || 'Internal Server Error';

    const responseBody = {
      headers,
      query,
      params,
      timestamp: new Date().toISOString(),
      ip: requestIp.getClientIp(ctx.getRequest()),
      exception: exception['name'],
      error: message,
    };

    this.logger.error('[Exception Filter] Error:', responseBody);
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
