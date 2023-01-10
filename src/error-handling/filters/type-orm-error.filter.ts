
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class TypeORMErrorFilter implements ExceptionFilter {
    catch(exception: EntityNotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        console.error({
            timestamp: new Date().toISOString(),
            path: request.path,
            exception: exception
        });

        response
            .status(HttpStatus.NOT_FOUND)
            .json({
                error: exception.name,
                statusCode: HttpStatus.NOT_FOUND,
            });
    }
}
