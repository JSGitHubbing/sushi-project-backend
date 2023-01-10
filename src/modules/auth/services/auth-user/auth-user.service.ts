import { Inject, Injectable } from '@nestjs/common';
import { AlreadyExistsException } from 'src/error-handling/exceptions/already-exists-exception';
import { Repository } from 'typeorm';
import { AuthUserDto } from '../../dtos/auth-user.dto';
import { AuthUser } from '../../entities/auth-user/auth-user.entity';
import { AUTH_USER_REPOSITORY } from '../../providers/auth-user.providers';

@Injectable()
export class AuthUserService {
    constructor(
        @Inject(AUTH_USER_REPOSITORY)
        private userRepository: Repository<AuthUser>,
    ) { }

    async findById(id: number): Promise<AuthUserDto> {
        return this.userRepository.findOneByOrFail({ id, isActive: true, isEnabled: true });
    }

    async create(user: AuthUserDto): Promise<AuthUserDto> {
        if (this.userRepository.exist({ where: { username: user.username } }))
            throw new AlreadyExistsException('Username is already in use');

        return this.userRepository.save(user);
    }

    async activate(userId: number): Promise<AuthUserDto> {
        let user = await this.userRepository.findOneByOrFail({ id: userId, isEnabled: true });
        user.isActive = true;
        return this.userRepository.save(user);
    }

    async deactivate(userId: number): Promise<AuthUserDto> {
        let user = await this.userRepository.findOneByOrFail({ id: userId, isEnabled: true });
        user.isActive = false;
        return this.userRepository.save(user);
    }

    async delete(userId: number): Promise<void> {
        let user = await this.userRepository.findOneByOrFail({ id: userId });
        user.isEnabled = false;
        await this.userRepository.save(user);
    }
}
