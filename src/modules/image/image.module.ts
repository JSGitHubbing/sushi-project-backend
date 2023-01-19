import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { ImageController } from './controllers/image.controller';
import { imageProviders } from './providers/image.providers';
import { ImageService } from './services/image.service';

@Module({
  imports: [DatabaseModule],
  providers: [...imageProviders, ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
