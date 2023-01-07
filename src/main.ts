import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const packageInfo = require('../package.json');

  const fs = require('fs');
  const keyFile = fs.readFileSync(__dirname + '/../ssl/localhost.key');
  const certFile = fs.readFileSync(__dirname + '/../ssl/localhost.crt');

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });

  // SWAGGER CONFIG
  const config = new DocumentBuilder()
    .setTitle(packageInfo.name)
    .setDescription(packageInfo.description)
    .setVersion(packageInfo.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
