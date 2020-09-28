import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { IsString, Matches } from 'class-validator';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

export class FileDto {
  @ApiProperty()
  @Matches(/^[a-z0-9_\-]+$/)
  id!: string;

  @ApiProperty()
  @IsString()
  content!: string;
}

@ApiTags('files')
@ApiBearerAuth()
@Controller('files')
@UseGuards(AuthGuard('jwt'))
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get()
  @ApiImplicitQuery({
    name: 'search',
    type: String,
    description: 'Filter the files by name',
    required: false,
  })
  getFiles(@Query('search') fileNameSearch?: string) {
    return this.filesService.getFiles(fileNameSearch);
  }

  @Put()
  createFile(@Body() fileDto: FileDto) {
    return this.filesService.createFile(fileDto);
  }

  @Post()
  updateFile(@Body() fileDto: FileDto) {
    return this.filesService.updateFile(fileDto);
  }

  @Delete(':fileName')
  deleteFile(@Param('fileName') fileName: string) {
    return this.filesService.deleteFile(fileName);
  }
}
