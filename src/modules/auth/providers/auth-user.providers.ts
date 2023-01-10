
import { DATA_SOURCE } from 'src/database/database.providers';
import { DataSource } from 'typeorm';
import { AuthUser } from '../entities/auth-user/auth-user.entity';

export const AUTH_USER_REPOSITORY = 'AUTH_USER_REPOSITORY';
export const authUserProviders = [
    {
        provide: AUTH_USER_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AuthUser),
        inject: [DATA_SOURCE]
    }
]