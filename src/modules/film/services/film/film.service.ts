import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FilmDto } from '../../dtos/film.dto';
import { FilmListMapper } from '../../dtos/mappers/file.dto.mapper';
import { Film } from '../../entities/film/film.entity';
import { FILM_REPOSITORY } from '../../providers/film.providers';

@Injectable()
export class FilmService {
  constructor(
    @Inject(FILM_REPOSITORY)
    private filmRepository: Repository<Film>,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    return this.filmRepository.find().then(FilmListMapper);
  }
}
