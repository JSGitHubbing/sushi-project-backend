import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../lib/decorators/public-route';
import { HttpExceptionFilter, TypeORMErrorFilter } from '../../../../error-handling';
import { AccessTokenDto } from '../../dtos/access-token.dto';
import { AuthUserDto } from '../../dtos/auth-user.dto';
import { AuthService } from '../../services/auth/auth.service';

@ApiTags('auth')
@Controller('auth')
@UseFilters(TypeORMErrorFilter, HttpExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  login(@Body() loginDto: AuthUserDto): Promise<AccessTokenDto> {
    return this.authService.login(loginDto);
  }
}
