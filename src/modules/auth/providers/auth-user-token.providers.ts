
import { DATA_SOURCE } from 'src/database/database.providers';
import { DataSource } from 'typeorm';
import { AuthUserToken } from '../entities';

export const AUTH_USER_TOKEN_REPOSITORY = 'AUTH_USER_TOKEN_REPOSITORY';
export const authUserTokenProviders = [
    {
        provide: AUTH_USER_TOKEN_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AuthUserToken),
        inject: [DATA_SOURCE]
    }
]