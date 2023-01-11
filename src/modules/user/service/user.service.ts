import { Inject, Injectable } from '@nestjs/common';
import { AlreadyExistsException } from 'src/error-handling/exceptions/already-exists-exception';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { USER_REPOSITORY } from '../providers/user.providers';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: Repository<User>,
    ) { }

    async findById(id: number): Promise<User> {
        return this.userRepository.findOneByOrFail({ id, isActive: true, isEnabled: true });
    }

    async create(user: User): Promise<User> {
        if (this.userRepository.exist({ where: { username: user.username } }))
            throw new AlreadyExistsException('Username is already in use');

        return this.userRepository.save(user);
    }

    async activate(userId: number): Promise<User> {
        let user = await this.userRepository.findOneByOrFail({ id: userId, isEnabled: true });
        user.isActive = true;
        return this.userRepository.save(user);
    }

    async deactivate(userId: number): Promise<User> {
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
