import { DATA_SOURCE } from 'src/core/database/database.providers';
import { DataSource } from 'typeorm';
import { Film } from '../entities/film/film.entity';

export const FILM_REPOSITORY = 'FILM_REPOSITORY';
export const filmProviders = [
  {
    provide: FILM_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Film),
    inject: [DATA_SOURCE],
  },
];
