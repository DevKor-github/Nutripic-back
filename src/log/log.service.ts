import {
  Injectable,
  NotFoundException,
  StreamableFile,
  UnauthorizedException,
} from '@nestjs/common';
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
  getLogs(pw: string): StreamableFile {
    if (pw !== this.configService.get('LOG_PW')) {
      throw new UnauthorizedException('로그 파일을 확인할 권한이 없습니다.');
    }
    if (!existsSync(this.logFilePath)) {
      throw new NotFoundException('로그 파일이 존재하지 않습니다.');
    }
    return new StreamableFile(createReadStream(this.logFilePath), {
      type: 'text/plain',
    });
  }

  getErrorLogs(pw: string): StreamableFile {
    if (pw != this.configService.get('LOG_PW')) {
      throw new UnauthorizedException('로그 파일을 확인할 권한이 없습니다.');
    }
    if (!existsSync(this.logFilePath)) {
      throw new NotFoundException('로그 파일이 존재하지 않습니다.');
    }
    return new StreamableFile(createReadStream(this.errorLogFilePath), {
      type: 'text/plain',
    });
  }
}
