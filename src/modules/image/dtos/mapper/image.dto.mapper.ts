import { ImageDto } from '../image.dto';
import { Image } from '../../entities/image/image.entity';

export const ImageMapper = (entity: Image): ImageDto => {
  return {
    id: entity.id,
    name: entity.name,
    path: entity.path,
  };
};
