import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from '../entities/image.entity';
import { IMAGE_REPOSITORY } from '../providers/image.providers';

@Injectable()
export class ImageService {
    constructor(
        @Inject(IMAGE_REPOSITORY)
        private imageRepository: Repository<Image>,
    ) { }

    async findById(id: number): Promise<Image> {
        return this.imageRepository.findOneByOrFail({ id });
    }
}
