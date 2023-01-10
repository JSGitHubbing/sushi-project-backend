import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from '../user/providers/user.providers';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AccessTokenStrategy } from './middleware/strategies/jwt.auth';
import { AuthService } from './services/auth/auth.service';
import { AuthUserService } from './services/auth-user/auth-user.service';
import { authUserProviders } from './providers/auth-user.providers';
import { AuthUserController } from './controllers/auth-user/auth-user.controller';
import { authUserTokenProviders } from './providers/auth-user-token.providers';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION_TIME },
    }),
    DatabaseModule,
  ],
  providers: [...authUserProviders, ...authUserTokenProviders, AccessTokenStrategy, AuthUserService, AuthService],
  controllers: [AuthUserController, AuthController],
})
export class AuthModule { }
