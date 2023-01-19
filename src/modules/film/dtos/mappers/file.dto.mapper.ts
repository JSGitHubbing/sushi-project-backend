import { ImageMapper } from 'src/modules/image/dtos/mapper/image.dto.mapper';
import { Film } from '../../entities/film/film.entity';
import { FilmDto } from '../film.dto';

export const FilmMapper = (entity: Film): FilmDto => {
  return {
    id: entity.id,
    name: entity.name,
    description: entity.description,
    videoPath: entity.videoPath,
    image: ImageMapper(entity.image),
  };
};

export const FilmListMapper = (entityList: Film[]): FilmDto[] => {
  return entityList.map(FilmMapper);
};
