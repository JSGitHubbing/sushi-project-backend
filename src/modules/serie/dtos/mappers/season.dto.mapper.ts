import { Season } from '../../entities/season/season.entity';
import { SeasonDto } from '../season.dto';
import { ChapterListMapper } from './chapter.dto.mapper';

export const SeasonMapper = (entity: Season): SeasonDto => {
  return {
    id: entity.id,
    name: entity.name,
    description: entity.description,
    seasonNumber: entity.seasonNumber,
    chapters: ChapterListMapper(entity.chapters),
  };
};

export const SeasonListMapper = (entityList: Season[]): SeasonDto[] => {
  return entityList.map(SeasonMapper);
};
