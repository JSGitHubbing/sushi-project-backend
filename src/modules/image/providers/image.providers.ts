import { DATA_SOURCE } from 'src/core/database/database.providers';
import { DataSource } from 'typeorm';
import { Image } from '../entities/image/image.entity';

export const IMAGE_REPOSITORY = 'IMAGE_REPOSITORY';
export const imageProviders = [
  {
    provide: IMAGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Image),
    inject: [DATA_SOURCE],
  },
];
