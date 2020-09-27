import { Injectable } from '@nestjs/common';
import { FileDto } from './files.controller';
import { promises as fs } from 'fs';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class FilesService {
  constructor(
    private logger: LoggerService,
    private configService: ConfigService,
  ) {}

  async getFiles(fileNameSearch: string | undefined) {
    try {
      const fileNames = (
        await fs.readdir(this.configService.get<string>('PATH')!)
      )
        .filter((filename) => filename.startsWith('.qmail-'))
        .filter(
          (filename) =>
            !fileNameSearch || this.fileNameFilter(filename, fileNameSearch),
        );
      return Promise.all(
        fileNames.map(async (name) => {
          const content =
            (await fs.readFile(`${this.configService.get('PATH')}/${name}`)) +
            '';
          return { id: name.substring(7), content };
        }),
      );
    } catch (error) {
      this.logger.error(error);
      throw {
        key: 'internal_error',
        message: `Could not find file names for: ${fileNameSearch}`,
      };
    }
  }

  async createFile(fileDto: FileDto) {
    try {
      // TODO: Disallow creation of existing file
      await fs.writeFile(
        `${this.configService.get('PATH')}/.qmail-${fileDto.name}`,
        fileDto.content,
      );
    } catch (err) {
      this.logger.error(
        'Could not create file.',
        err.stackTrace,
        JSON.stringify(fileDto),
      );
      throw {
        key: 'internal_error',
        message: `Could not create file.`,
      };
    }
  }

  updateFile(fileDto: FileDto) {
    // TODO: implement
  }

  async deleteFile(fileName: string) {
    try {
      await fs.unlink(`${this.configService.get('PATH')}/.qmail-${fileName}`);
    } catch (err) {
      this.logger.error(
        'Could not delete file with name',
        err.stackTrace,
        fileName,
      );
      throw {
        key: 'internal_error',
        message: `Could not delete file.`,
      };
    }
  }

  private fileNameFilter(fileName: string, fileNameFilter: string) {
    const normalizedFilter = (fileNameFilter + '').trim().toLowerCase();
    const normalizedFileName = fileName.toLowerCase().substring(7);
    this.logger.debug!(
      JSON.stringify({ normalizedFilter, normalizedFileName }),
    );
    return normalizedFileName.includes(normalizedFilter);
  }
}
