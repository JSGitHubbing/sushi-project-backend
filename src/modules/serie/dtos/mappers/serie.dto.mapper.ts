import { ImageMapper } from 'src/modules/image/dtos/mapper/image.dto.mapper';
import { Serie } from '../../entities/serie/serie.entity';
import { SerieDto } from '../serie.dto';
import { SeasonListMapper } from './season.dto.mapper';

export const SerieMapper = (entity: Serie): SerieDto => {
  return {
    id: entity.id,
    name: entity.name,
    description: entity.description,
    image: ImageMapper(entity.image),
    seasons: SeasonListMapper(entity.seasons),
  };
};

export const SerieListMapper = (entityList: Serie[]): SerieDto[] => {
  return entityList.map(SerieMapper);
};
