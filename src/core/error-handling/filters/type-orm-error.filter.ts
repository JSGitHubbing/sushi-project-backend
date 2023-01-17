
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import { HttpErrorDto } from '../http-error.dto';

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

        const httpError: HttpErrorDto = {
            error: exception.name,
            message: 'Could not find the entity.',
            statusCode: HttpStatus.NOT_FOUND,
        }

        response
            .status(HttpStatus.NOT_FOUND)
            .json(httpError);
    }
}
