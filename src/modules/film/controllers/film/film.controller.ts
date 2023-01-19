import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilmDto } from '../../dtos/film.dto';
import { FilmService } from '../../services/film/film.service';

@ApiTags('film')
@Controller('film')
export class FilmController {
  constructor(private filmService: FilmService) {}

  @ApiOperation({ summary: 'Retrieves all the films' })
  @ApiResponse({
    description: 'Data successfully retrieved',
    status: HttpStatus.OK,
    type: [FilmDto],
  })
  @Get()
  findById(): Promise<FilmDto[]> {
    return this.filmService.findAll();
  }
}
