import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { AuthUserController } from './api/controllers/auth-user/auth-user.controller';
import { AuthController } from './api/controllers/auth/auth.controller';
import { AccessTokenStrategy } from './api/middleware/strategies/jwt.auth';
import { authProviders, routeSecurityProviders } from './api/providers/auth.providers';
import { AuthUserService } from './api/services/auth-user/auth-user.service';
import { AuthService } from './api/services/auth/auth.service';
import { CryptoService } from './lib/crypto/crypto.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION_TIME },
    }),
    DatabaseModule,
  ],
  providers: [
    ...authProviders,
    routeSecurityProviders,
    AccessTokenStrategy,
    AuthUserService,
    AuthService,
    CryptoService,
  ],
  controllers: [AuthUserController, AuthController],
})
export class AuthModule { }
