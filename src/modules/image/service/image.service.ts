import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ImageDto } from '../dto/image.dto';
import { ImageMapper } from '../dto/mapper/image.dto.mapper';
import { Image } from '../entities/image.entity';
import { IMAGE_REPOSITORY } from '../providers/image.providers';

@Injectable()
export class ImageService {
    constructor(
        @Inject(IMAGE_REPOSITORY)
        private imageRepository: Repository<Image>,
    ) { }

    async findById(id: number): Promise<ImageDto> {
        return this.imageRepository.findOneByOrFail({ id })
            .then(ImageMapper);
    }
}
