import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { SwaggerConfig } from 'src/core/config/swagger-config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const apiPrefix = configService.get<string>('apiPrefix');
  app.setGlobalPrefix(apiPrefix);

  // SWAGGER CONFIG
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(process.env.npm_package_version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = `${apiPrefix}/docs`;
  SwaggerModule.setup(swaggerPath, app, document);

  await app.listen(port).then((_) => {
    console.log(`Server started at port ${port}`);
    console.log(`Swagger deployed at ${swaggerPath}`);
  });
}
bootstrap();
