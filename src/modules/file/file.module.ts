import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';

@Module({
  imports: [DatabaseModule],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
