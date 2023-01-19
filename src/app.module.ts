import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ImageModule } from './modules/image/image.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CoreModule,
    ImageModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }