import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AccessTokenInfo } from '../../dtos/access-token-info';
import { AccessTokenDto } from '../../dtos/access-token.dto';
import { AuthUserDto } from '../../dtos/auth-user.dto';
import { AuthUser, AuthUserToken } from '../../entities';
import { AUTH_USER_TOKEN_REPOSITORY } from '../../providers/auth-user-token.providers';
import { AUTH_USER_REPOSITORY } from '../../providers/auth-user.providers';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_USER_REPOSITORY)
    private authUserRepository: Repository<AuthUser>,
    @Inject(AUTH_USER_TOKEN_REPOSITORY)
    private authUserTokenRepository: Repository<AuthUserToken>,
    private jwtService: JwtService,
  ) { }

  async login(loginDto: AuthUserDto): Promise<AccessTokenDto> {
    const user = await this.authUserRepository.findOneOrFail({
      where: { username: loginDto.username },
    });

    // TODO check password

    const info: AccessTokenInfo = { userId: user.id, username: user.username };

    const accessToken = await this.jwtService.signAsync(
      info,
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.TOKEN_EXPIRATION_TIME,
      },
    );

    let retrievedToken = await this.authUserTokenRepository.findOneBy({ authUser: user });
    if (retrievedToken) {
      retrievedToken.token = accessToken;
    } else {
      this.authUserTokenRepository.save({ id: null, authUser: user, token: accessToken });
    }

    return { accessToken };
  }
}
