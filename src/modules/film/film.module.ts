import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { FilmController } from './controllers/film/film.controller';
import { filmProviders } from './providers/film.providers';
import { FilmService } from './services/film/film.service';

@Module({
  imports: [DatabaseModule],
  providers: [...filmProviders, FilmService],
  controllers: [FilmController],
})
export class FilmModule {}
