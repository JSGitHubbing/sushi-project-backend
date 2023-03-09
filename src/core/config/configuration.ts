import { JwtSignOptions } from '@nestjs/jwt';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { BcryptConfig } from './bcrypt-config';
import { SwaggerConfig } from './swagger-config';

interface Configuration {
  apiPrefix: string;
  port: number;
  database: DataSourceOptions;
  swagger: SwaggerConfig;
  jwt: {
    signOptions: JwtSignOptions;
  };
  bcrypt: BcryptConfig;
  mediaPath: string;
}

export default (): Configuration => ({
  apiPrefix: 'api',
  port: parseInt(process.env.APP_PORT) || 3000,
  database: {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    database: process.env.DATABASE_SCHEMA,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    entities: [
      join(
        __dirname,
        process.env.DATABASE_ENTITY_DIR || '/**/*.entity{.ts,.js}',
      ),
      join(
        __dirname,
        '../../modules',
        process.env.DATABASE_ENTITY_DIR || '/**/*.entity{.ts,.js}',
      ),
    ],
    synchronize: process.env.ENV === 'dev',
  },
  swagger: {
    title: process.env.DATABASE_TITLE || 'App API',
    description: process.env.DATABASE_DESCRIPTION,
  },
  jwt: {
    signOptions: {
      secret: process.env.JWT_SECRET || '',
      expiresIn: process.env.TOKEN_EXPIRATION_TIME || '1d',
    },
  },
  bcrypt: {
    saltRounds: 10,
  },
  mediaPath: process.env.MEDIA_PATH || 'C:/',
});
