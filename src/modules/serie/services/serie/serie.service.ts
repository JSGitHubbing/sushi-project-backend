import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  SerieListMapper,
  SerieMapper,
} from '../../dtos/mappers/serie.dto.mapper';
import { SerieDto } from '../../dtos/serie.dto';
import { Serie } from '../../entities/serie/serie.entity';
import { SERIE_REPOSITORY } from '../../providers/serie.providers';

@Injectable()
export class SerieService {
  constructor(
    @Inject(SERIE_REPOSITORY)
    private serieRepository: Repository<Serie>,
  ) {}

  async findAll(): Promise<SerieDto[]> {
    return this.serieRepository.find().then(SerieListMapper);
  }

  async findById(id: number): Promise<SerieDto> {
    return this.serieRepository.findOneByOrFail({ id }).then(SerieMapper);
  }
}
