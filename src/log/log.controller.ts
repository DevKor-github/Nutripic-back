import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { LogService } from './log.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.guard';

@ApiTags('Log')
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @ApiOperation({ summary: '로그 파일 확인' })
  @Public()
  @Get()
  getLog(): StreamableFile {
    return this.logService.getLogs();
  }

  @ApiOperation({ summary: '에러 로그 확인' })
  @Public()
  @Get('/error')
  getErrorLog(): StreamableFile {
    return this.logService.getErrorLogs();
  }
}
