import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CryptoService } from 'src/core/auth/lib/crypto/crypto.service';
import configuration from 'src/core/config/configuration';
import { Repository } from 'typeorm';
import { AccessTokenInfo } from '../../dtos/access-token-info';
import { AccessTokenDto } from '../../dtos/access-token.dto';
import { AuthUserDto } from '../../dtos/auth-user.dto';
import { AuthUser, AuthUserToken } from '../../entities';
import { AUTH_USER_REPOSITORY, AUTH_USER_TOKEN_REPOSITORY } from '../../providers';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_USER_REPOSITORY)
    private authUserRepository: Repository<AuthUser>,
    @Inject(AUTH_USER_TOKEN_REPOSITORY)
    private authUserTokenRepository: Repository<AuthUserToken>,
    private jwtService: JwtService,
    private configurationService: ConfigService,
    private cryptoService: CryptoService,
  ) { }

  async login(loginDto: AuthUserDto): Promise<AccessTokenDto> {
    const user = await this.authUserRepository.findOneOrFail({
      where: { username: loginDto.username },
    });

    const passwordCorrect = await this.cryptoService.verify(loginDto.password, user.password);

    if (!passwordCorrect)
      throw new UnauthorizedException('The username or password provided are not correct.');


    const info: AccessTokenInfo = { userId: user.id, username: user.username };

    const accessToken = await this.jwtService.signAsync(
      info,
      this.configurationService.get<JwtSignOptions>('jwt.signOptions')
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
