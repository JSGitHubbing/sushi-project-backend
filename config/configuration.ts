import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SwaggerConfig } from "./swagger-config";

interface Configuration {
    port: number,
    database: TypeOrmModuleOptions,
    swagger: SwaggerConfig,
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
        entities: ["src/**/*.ts"],
        synchronize: true,
    },
    swagger: {
        title: process.env.DATABASE_TITLE || 'App API',
        description: process.env.DATABASE_DESCRIPTION,
    }
})