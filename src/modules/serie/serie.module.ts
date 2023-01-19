import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { SerieController } from './controllers/serie/serie.controller';
import { serieProviders } from './providers/serie.providers';
import { SerieService } from './services/serie/serie.service';

@Module({
  imports: [DatabaseModule],
  providers: [...serieProviders, SerieService],
  controllers: [SerieController],
})
export class SerieModule {}
