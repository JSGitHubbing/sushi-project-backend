import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/error-handling/filters/http-exception.filter';
import { TypeORMErrorFilter } from 'src/error-handling/filters/type-orm-error.filter';
import { User } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
@UseFilters(TypeORMErrorFilter, HttpExceptionFilter)
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get(':id')
    findById(@Param() params: any): Promise<User> {
        return this.userService.findById(params.id);
    }

    @Post()
    create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Put('activate')
    activate(@Param() params: any): Promise<User> {
        return this.userService.activate(params.id);
    }

    @Put('deactivate')
    deactivate(@Param() params: any): Promise<User> {
        return this.userService.deactivate(params.id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param() params: any): Promise<void> {
        return this.userService.delete(params.id);
    }


}