import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpErrorDto } from 'src/core/error-handling';
import { SerieDto } from '../../dtos/serie.dto';
import { SerieService } from '../../services/serie/serie.service';

@ApiTags('serie')
@Controller('serie')
export class SerieController {
  constructor(private serieService: SerieService) {}

  @ApiOperation({ summary: 'Retrieves all the Series' })
  @ApiResponse({
    description: 'Series retrived successfuly',
    status: HttpStatus.OK,
    type: [SerieDto],
  })
  @Get()
  findAll(): Promise<SerieDto[]> {
    return this.serieService.findAll();
  }

  @ApiOperation({ summary: 'Retrieves the serie with the ID provided' })
  @ApiResponse({
    description: 'Serie retrived successfuly',
    status: HttpStatus.OK,
    type: [SerieDto],
  })
  @ApiResponse({
    description: 'Serie not found',
    status: HttpStatus.NOT_FOUND,
    type: HttpErrorDto,
  })
  @Get(':id')
  findById(@Param() params: any): Promise<SerieDto> {
    return this.serieService.findById(params.id);
  }
}
