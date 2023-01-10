import { HttpException, HttpStatus } from "@nestjs/common";

export class AlreadyExistsException extends HttpException {
    constructor(message: string = 'AlreadyExistsException') {
        super(message, HttpStatus.BAD_REQUEST);
    }
}