import { ApiProperty } from '@nestjs/swagger';

export class ChapterDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  chapterNumber: number;

  @ApiProperty()
  path: string;
}
