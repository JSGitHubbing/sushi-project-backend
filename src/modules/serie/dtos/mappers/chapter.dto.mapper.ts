import { Chapter } from '../../entities/chapter/chapter.entity';
import { ChapterDto } from '../chapter.dto';

export const ChapterMapper = (entity: Chapter): ChapterDto => {
  return {
    id: entity.id,
    name: entity.name,
    chapterNumber: entity.chapterNumber,
    path: entity.path,
  };
};

export const ChapterListMapper = (entityList: Chapter[]): ChapterDto[] => {
  return entityList.map(ChapterMapper);
};
