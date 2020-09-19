import { Controller, Get, Query } from '@nestjs/common';

@Controller('files')
export class FilesController {
  @Get()
  getFiles(@Query('search') search: string) {
    return search;
  }
}
