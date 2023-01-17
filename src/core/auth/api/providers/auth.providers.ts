
import { APP_GUARD } from '@nestjs/core';
import { DATA_SOURCE } from '../../../database/database.providers';
import { DataSource } from 'typeorm';
import { AuthUser, AuthUserToken } from '../entities';
import { AccessTokenGuard } from '../middleware/guards/access-token.guard';
import { AUTH_USER_REPOSITORY, AUTH_USER_TOKEN_REPOSITORY } from './constats';

export const authProviders = [
    {
        provide: AUTH_USER_TOKEN_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AuthUserToken),
        inject: [DATA_SOURCE]
    },
    {
        provide: AUTH_USER_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AuthUser),
        inject: [DATA_SOURCE]
    },
]

export const routeSecurityProviders =
{
    provide: APP_GUARD,
    useClass: AccessTokenGuard
}