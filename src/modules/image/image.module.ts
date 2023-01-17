import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { ImageController } from './controller/image.controller';
import { imageProviders } from './providers/image.providers';
import { ImageService } from './service/image.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...imageProviders,
        ImageService
    ],
    controllers: [ImageController]
})
export class ImageModule { }
