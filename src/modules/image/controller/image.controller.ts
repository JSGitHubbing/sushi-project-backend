import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { ImageService } from '../service/image.service';
import { Image } from '../entities/image.entity';
import { HttpExceptionFilter, TypeORMErrorFilter } from 'src/core/error-handling';

@Controller('image')
@UseFilters(TypeORMErrorFilter, HttpExceptionFilter)
export class ImageController {

    constructor(
        private imageService: ImageService,
    ) { }

    @Get(':id')
    findById(@Param() params: any): Promise<Image> {
        return this.imageService.findById(params.id);
    }

}
