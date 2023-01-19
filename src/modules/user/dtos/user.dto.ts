import { ApiProperty } from '@nestjs/swagger';
import { ImageDto } from 'src/modules/image/dtos/image.dto';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  image: ImageDto;
}
