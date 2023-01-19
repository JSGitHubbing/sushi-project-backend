import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserMapper } from '../dtos/mapper/user.dto.mapper';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { USER_REPOSITORY } from '../providers/user.providers';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: Repository<User>,
    ) { }

    async findById(id: number): Promise<UserDto> {
        return this.userRepository.findOneByOrFail({ id }).then(UserMapper);
    }

    async create(user: UserDto): Promise<UserDto> {
        return this.userRepository.save(user).then(UserMapper);;
    }

    async delete(userId: number): Promise<void> {
        let user = await this.userRepository.findOneByOrFail({ id: userId });
        await this.userRepository.remove(user);
    }
}
