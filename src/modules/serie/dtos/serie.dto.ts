import { ApiProperty } from '@nestjs/swagger';
import { ImageDto } from 'src/modules/image/dtos/image.dto';
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

  @ApiProperty({ type: [SeasonDto] })
  seasons: SeasonDto[];
}
