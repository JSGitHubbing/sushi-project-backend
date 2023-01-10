import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger";

export class HttpErrorDto {

    @ApiProperty({ description: 'Name of the exception thrown' })
    error: string;

    @ApiProperty({ description: 'HttpStatus of the request', example: '400' })
    statusCode: HttpStatus;
}