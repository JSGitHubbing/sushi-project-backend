import { ImageMapper } from 'src/modules/image/dtos/mapper/image.dto.mapper';
import { User } from '../../entities/user.entity';
import { UserDto } from '../user.dto';

export const UserMapper = (entity: User): UserDto => {
  return {
    id: entity.id,
    name: entity.name,
    surname: entity.surname,
    image: ImageMapper(entity.image),
  };
};
