import { JwtSignOptions } from '@nestjs/jwt';
import { DataSourceOptions } from 'typeorm';
import { SwaggerConfig } from './swagger-config';

interface Configuration {
  port: number;
  database: DataSourceOptions;
  swagger: SwaggerConfig;
  jwt: {
    signOptions: JwtSignOptions
  }
}

export default (): Configuration => ({
  port: parseInt(process.env.APP_PORT) || 3000,
  database: {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    database: process.env.DATABASE_SCHEMA,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    entities: [
      __dirname +
      (process.env.DATABASE_ENTITY_DIR || '/../**/*.entity{.ts,.js}'),
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
    }
  }
});
