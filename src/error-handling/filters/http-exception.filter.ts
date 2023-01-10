
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpErrorDto } from '../http-error.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        console.error({
            timestamp: new Date().toISOString(),
            path: request.path,
            exception: exception
        });

        const httpError: HttpErrorDto = {
            error: exception.name,
            statusCode: exception.getStatus(),
        }

        response
            .status(HttpStatus.NOT_FOUND)
            .json(httpError);
    }
}
