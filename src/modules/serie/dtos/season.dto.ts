import { ApiProperty } from '@nestjs/swagger';
import { ChapterDto } from './chapter.dto';

export class SeasonDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  seasonNumber: number;

  @ApiProperty()
  chapters: ChapterDto[];
}
