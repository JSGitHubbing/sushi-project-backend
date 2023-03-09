import { Injectable, StreamableFile } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  constructor(private configService: ConfigService) {}

  getFile(path: string): StreamableFile {
    const mediaPath = this.configService.get('mediaPath');
    const file = createReadStream(join(mediaPath, path));

    file.on('error', (error) => {
      console.error({
        timestamp: new Date().toISOString(),
        path: path,
        exception: error,
      });
    });

    return new StreamableFile(file);
  }
}
