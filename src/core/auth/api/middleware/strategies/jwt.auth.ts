import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_USER_REPOSITORY } from '../../providers';
import { Repository } from 'typeorm';
import { AuthUser } from '../../entities';
import { ConfigService } from '@nestjs/config';

type TokenContent = {
  userId: number;
  username: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(AUTH_USER_REPOSITORY)
    private authUserRepository: Repository<AuthUser>,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.signOptions.secret'),
    });
  }

  async validate(payload: TokenContent) {
    const user = await this.authUserRepository.findBy(
      {
        id: payload.userId,
        username: payload.username,
        isActive: true,
        isEnabled: true
      });
    return user;
  }
}
