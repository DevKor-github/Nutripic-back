import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream, existsSync } from 'fs';

@Injectable()
export class LogService {
  private logFilePath: string;
  private errorLogFilePath: string;
  constructor(private readonly configService: ConfigService) {
    this.logFilePath = this.configService.get('LOG_FILE_PATH');
    this.errorLogFilePath = this.configService.get('ERROR_LOG_FILE_PATH');
  }
  getLogs(): StreamableFile {
    if (!existsSync(this.logFilePath)) {
      throw new NotFoundException('로그 파일이 존재하지 않습니다.');
    }
    return new StreamableFile(createReadStream(this.logFilePath), {
      type: 'text/plain',
    });
  }
  getErrorLogs(): StreamableFile {
    if (!existsSync(this.logFilePath)) {
      throw new NotFoundException('로그 파일이 존재하지 않습니다.');
    }
    return new StreamableFile(createReadStream(this.errorLogFilePath), {
      type: 'text/plain',
    });
  }
}
