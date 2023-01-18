import { Inject, Injectable } from '@nestjs/common';
import { CryptoService } from 'src/core/auth/lib/crypto/crypto.service';
import { AlreadyExistsException } from 'src/core/error-handling';
import { Repository } from 'typeorm';
import { AuthUserDto } from '../../dtos/auth-user.dto';
import { AuthUserMapper } from '../../dtos/mappers/auth-user.dto.mapper';
import { AuthUser } from '../../entities/auth-user/auth-user.entity';
import { AUTH_USER_REPOSITORY } from '../../providers';

@Injectable()
export class AuthUserService {
    constructor(
        @Inject(AUTH_USER_REPOSITORY)
        private userRepository: Repository<AuthUser>,
        private cyrptoService: CryptoService
    ) { }

    async findById(id: number): Promise<AuthUserDto> {
        return this.userRepository
            .findOneByOrFail({ id, isActive: true, isEnabled: true })
            .then(AuthUserMapper);
    }

    async create(user: AuthUserDto): Promise<AuthUserDto> {
        if (await this.userRepository.exist({ where: { username: user.username } }))
            throw new AlreadyExistsException('Username is already in use');

        user.password = await this.cyrptoService.encrypt(user.password);

        return this.userRepository.save(user)
            .then(AuthUserMapper);
    }

    async activate(userId: number): Promise<AuthUserDto> {
        let user = await this.userRepository.findOneByOrFail({ id: userId, isEnabled: true });
        user.isActive = true;
        return this.userRepository.save(user)
            .then(AuthUserMapper);
    }

    async deactivate(userId: number): Promise<AuthUserDto> {
        let user = await this.userRepository.findOneByOrFail({ id: userId, isEnabled: true });
        user.isActive = false;
        return this.userRepository.save(user)
            .then(AuthUserMapper);
    }

    async delete(userId: number): Promise<void> {
        let user = await this.userRepository.findOneByOrFail({ id: userId });
        user.isEnabled = false;
        await this.userRepository.save(user)
            .then(AuthUserMapper);
    }
}
