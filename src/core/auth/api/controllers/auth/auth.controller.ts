import { Body, Controller, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../lib/decorators/public-route';
import { HttpErrorDto, HttpExceptionFilter, TypeORMErrorFilter } from '../../../../error-handling';
import { AccessTokenDto } from '../../dtos/access-token.dto';
import { AuthUserDto } from '../../dtos/auth-user.dto';
import { AuthService } from '../../services/auth/auth.service';

@ApiTags('auth')
@Controller('auth')
@UseFilters(TypeORMErrorFilter, HttpExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @ApiOperation({ summary: 'Gets the access token to use the application' })
  @ApiResponse({
    description: "Logged in successfully",
    status: HttpStatus.OK,
    type: AuthUserDto
  })
  @ApiResponse({
    description: "The user to log in was not found",
    status: HttpStatus.NOT_FOUND,
    type: HttpErrorDto
  })
  @Post('login')
  login(@Body() loginDto: AuthUserDto): Promise<AccessTokenDto> {
    return this.authService.login(loginDto);
  }
}
