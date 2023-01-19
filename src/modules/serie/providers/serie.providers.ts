import { DATA_SOURCE } from 'src/core/database/database.providers';
import { DataSource } from 'typeorm';
import { Chapter } from '../entities/chapter/chapter.entity';
import { Season } from '../entities/season/season.entity';
import { Serie } from '../entities/serie/serie.entity';

export const SERIE_REPOSITORY = 'SERIE_REPOSITORY';
export const SEASON_REPOSITORY = 'SEASON_REPOSITORY';
export const CHAPTER_REPOSITORY = 'CHAPTER_REPOSITORY';
export const serieProviders = [
  {
    provide: SERIE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Serie),
    inject: [DATA_SOURCE],
  },
  {
    provide: SEASON_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Season),
    inject: [DATA_SOURCE],
  },
  {
    provide: CHAPTER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Chapter),
    inject: [DATA_SOURCE],
  },
];
