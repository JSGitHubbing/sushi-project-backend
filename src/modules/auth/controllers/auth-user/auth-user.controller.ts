import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/error-handling/filters/http-exception.filter';
import { TypeORMErrorFilter } from 'src/error-handling/filters/type-orm-error.filter';
import { HttpErrorDto } from 'src/error-handling/http-error.dto';
import { AuthUserDto } from '../../dtos/auth-user.dto';
import { AuthUserService } from '../../services/auth-user/auth-user.service';

@ApiTags('auth')
@Controller('auth-user')
@UseFilters(TypeORMErrorFilter, HttpExceptionFilter)
export class AuthUserController {
    constructor(
        private authUserService: AuthUserService
    ) { }

    @ApiOperation({ summary: 'Retrieves the AuthUserDto using the provided ID' })
    @ApiResponse({
        description: "The matching user",
        status: HttpStatus.OK,
        type: AuthUserDto
    })
    @ApiResponse({
        description: "The user was not found",
        status: HttpStatus.NOT_FOUND,
        type: HttpErrorDto
    })
    @Get(':id')
    findById(@Param() params: any): Promise<AuthUserDto> {
        return this.authUserService.findById(params.id);
    }

    @ApiOperation({
        summary: 'Creates a new user with the provided credentials.',
        description: 'The username must be unique in the application.'
    })
    @ApiResponse({
        description: "The created user",
        status: HttpStatus.OK,
        type: AuthUserDto
    })
    @ApiResponse({
        description: "The username is already in use",
        status: HttpStatus.BAD_REQUEST,
        type: HttpErrorDto
    })
    @Post()
    create(@Body() authUser: AuthUserDto): Promise<AuthUserDto> {
        return this.authUserService.create(authUser);
    }

    @ApiOperation({
        summary: 'Activates the referenced user',
    })
    @ApiResponse({
        description: "The activated user",
        status: HttpStatus.OK,
        type: AuthUserDto
    })
    @ApiResponse({
        description: "The user was not found",
        status: HttpStatus.NOT_FOUND,
        type: HttpErrorDto
    })
    @Put('activate')
    activate(@Param() params: any): Promise<AuthUserDto> {
        return this.authUserService.activate(params.id);
    }

    @ApiOperation({
        summary: 'Deactivates the referenced user',
    })
    @ApiResponse({
        description: "The deactivated user",
        status: HttpStatus.OK,
        type: AuthUserDto
    })
    @ApiResponse({
        description: "The user was not found",
        status: HttpStatus.NOT_FOUND,
        type: HttpErrorDto
    })
    @Put('deactivate')
    deactivate(@Param() params: any): Promise<AuthUserDto> {
        return this.authUserService.deactivate(params.id);
    }

    @ApiOperation({
        summary: 'Deletes the referenced user',
    })
    @ApiResponse({
        description: "The user was successfully deleted",
        status: HttpStatus.NO_CONTENT,
        type: AuthUserDto
    })
    @ApiResponse({
        description: "The user was not found",
        status: HttpStatus.NOT_FOUND,
        type: HttpErrorDto
    })
    @Delete(':id')
    delete(@Param() params: any): Promise<void> {
        return this.authUserService.delete(params.id);
    }
}
