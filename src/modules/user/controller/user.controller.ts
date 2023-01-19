import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpErrorDto, HttpExceptionFilter, TypeORMErrorFilter } from 'src/core/error-handling';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@ApiTags('user')
@Controller('user')
@UseFilters(TypeORMErrorFilter, HttpExceptionFilter)
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @ApiOperation({ summary: 'Retrieves the UserDto using the provided ID' })
    @ApiResponse({
        description: "The matching user",
        status: HttpStatus.OK,
        type: UserDto
    })
    @ApiResponse({
        description: "The user was not found",
        status: HttpStatus.NOT_FOUND,
        type: HttpErrorDto
    })
    @Get(':id')
    findById(@Param() params: any): Promise<UserDto> {
        return this.userService.findById(params.id);
    }


    @ApiOperation({ summary: 'Creates a new User with the data provided' })
    @ApiResponse({
        description: "The created user",
        status: HttpStatus.OK,
        type: UserDto
    })
    @ApiResponse({
        description: "The UserAuth was not found",
        status: HttpStatus.NOT_FOUND,
        type: HttpErrorDto
    })
    @Post()
    create(@Body() user: UserDto): Promise<UserDto> {
        return this.userService.create(user);
    }

    @ApiOperation({ summary: 'Retrieves the UserDto using the provided ID' })
    @ApiResponse({
        description: "The user was successfully deleted",
        status: HttpStatus.NO_CONTENT,
    })
    @ApiResponse({
        description: "The user was not found",
        status: HttpStatus.NOT_FOUND,
        type: HttpErrorDto
    })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param() params: any): Promise<void> {
        return this.userService.delete(params.id);
    }
}
