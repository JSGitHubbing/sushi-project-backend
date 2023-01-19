import { ApiProperty } from '@nestjs/swagger';
import { ImageDto } from 'src/modules/image/dto/image.dto';
import { SeasonDto } from './season.dto';

export class SerieDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: ImageDto;

  @ApiProperty()
  seasons: SeasonDto[];
}
