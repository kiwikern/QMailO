import { Injectable } from '@nestjs/common';
import { FileDto } from './files.controller';
import { promises as fs } from 'fs';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../logger/logger.service';
import {resolve} from 'path'

@Injectable()
export class FilesService {
  constructor(
    private logger: LoggerService,
    private configService: ConfigService,
  ) {}

  async getFiles(fileNameSearch?: string) {
    const path = this.configService.get<string>('QMAILO_PATH')!
    try {
      const fileNames = (
        await fs.readdir(path)
      )
        .filter((filename) => filename.startsWith('.qmail-'))
        .filter(
          (filename) =>
            !fileNameSearch || this.fileNameFilter(filename, fileNameSearch),
        );
      return Promise.all(
        fileNames.map(async (name) => {
          const content =
            (await fs.readFile(`${this.configService.get('QMAILO_PATH')}/${name}`)) +
            '';
          return { id: name.substring(7), content };
        }),
      );
    } catch (error) {
      this.logger.error(error);
      throw {
        key: 'internal_error',
        message: "Could not find file names",
      };
    }
  }

  async createFile(fileDto: FileDto) {
    return this.updateFile(fileDto)
  }

  async updateFile(fileDto: FileDto) {
    try {
      await fs.writeFile(
        `${this.configService.get('QMAILO_PATH')}/.qmail-${fileDto.id}`,
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

  async deleteFile(fileName: string) {
    const filePath = resolve(this.configService.get('QMAILO_PATH')!,`.qmail-${fileName}`);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.log(err)
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
