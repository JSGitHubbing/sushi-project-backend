import {
  Controller,
  Get,
  HttpStatus,
  Param,
  StreamableFile,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/core/error-handling';
import { FileService } from '../services/file.service';

@ApiTags('file')
@Controller('file')
@UseFilters(HttpExceptionFilter)
export class FileController {
  constructor(private fileSerivce: FileService) {}

  @ApiOperation({ summary: 'Gets the file stream' })
  @ApiResponse({
    description: 'Data successfully retrieved',
    status: HttpStatus.OK,
    type: [StreamableFile],
  })
  @ApiResponse({
    description: 'File not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':type/:name/:file')
  getFile(@Param() params: any) {
    const path = [params.type, params.name, params.file].join('/');
    return this.fileSerivce.getFile(path);
  }
}
