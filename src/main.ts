import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { SwaggerConfig } from 'config/swagger-config';
import { AppModule } from './app.module';

async function bootstrap() {

  const fs = require('fs');
  const keyFile = fs.readFileSync(__dirname + process.env.SSL_KEY);
  const certFile = fs.readFileSync(__dirname + process.env.SSL_CRT);

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  // SWAGGER CONFIG
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(process.env.npm_package_version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
