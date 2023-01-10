import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/error-handling/filters/http-exception.filter';
import { TypeORMErrorFilter } from 'src/error-handling/filters/type-orm-error.filter';
import { AccessTokenDto } from '../../dtos/access-token.dto';
import { AuthUserDto } from '../../dtos/auth-user.dto';
import { AuthService } from '../../services/auth/auth.service';

@ApiTags('auth')
@Controller('login')
@UseFilters(TypeORMErrorFilter, HttpExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post()
  login(@Body() loginDto: AuthUserDto): Promise<AccessTokenDto> {
    return this.authService.login(loginDto);
  }
}
