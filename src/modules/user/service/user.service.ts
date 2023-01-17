import { Inject, Injectable } from '@nestjs/common';
import { AlreadyExistsException } from 'src/core/error-handling';
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
        return this.userRepository.findOneByOrFail({ id });
    }

    async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async delete(userId: number): Promise<void> {
        let user = await this.userRepository.findOneByOrFail({ id: userId });
        await this.userRepository.remove(user);
    }
}
