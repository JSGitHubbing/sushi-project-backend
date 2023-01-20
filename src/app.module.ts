import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { FilmModule } from './modules/film/film.module';
import { ImageModule } from './modules/image/image.module';
import { SerieModule } from './modules/serie/serie.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CoreModule, ImageModule, UserModule, SerieModule, FilmModule],
})
export class AppModule {}
