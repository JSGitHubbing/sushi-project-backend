import { Controller, Get, HttpStatus, Param, UseFilters } from '@nestjs/common';
import { ImageService } from '../service/image.service';
import { Image } from '../entities/image.entity';
import { HttpErrorDto, HttpExceptionFilter, TypeORMErrorFilter } from 'src/core/error-handling';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImageDto } from '../dto/image.dto';

@ApiTags('image')
@Controller('image')
@UseFilters(TypeORMErrorFilter, HttpExceptionFilter)
export class ImageController {

    constructor(
        private imageService: ImageService,
    ) { }

    @ApiOperation({ summary: 'Retrieves the ImageDto using the provided ID' })
    @ApiResponse({
        description: "The matching image",
        status: HttpStatus.OK,
        type: ImageDto
    })
    @ApiResponse({
        description: "The image was not found",
        status: HttpStatus.NOT_FOUND,
        type: HttpErrorDto
    })
    @Get(':id')
    findById(@Param() params: any): Promise<ImageDto> {
        return this.imageService.findById(params.id);
    }

}
