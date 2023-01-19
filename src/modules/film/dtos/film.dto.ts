import { ApiProperty } from '@nestjs/swagger';
import { ImageDto } from 'src/modules/image/dto/image.dto';

export class FilmDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  videoPath: string;

  @ApiProperty()
  image: ImageDto;
}
