import {
  Controller,
  Get,
  Param,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { LogService } from './log.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.guard';
import { string } from 'joi';

@ApiTags('Log')
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Public()
  @Get('/test')
  getTest() {
    console.log('test');
    return 'test';
  }

  @ApiOperation({ summary: '로그 파일 확인' })
  @Public()
  @Get()
  getLog(@Query('pw') pw: string): StreamableFile {
    return this.logService.getLogs(pw);
  }

  @ApiOperation({ summary: '에러 로그 확인' })
  @Public()
  @Get('/error')
  getErrorLog(@Query('pw') pw: string): StreamableFile {
    return this.logService.getErrorLogs(pw);
  }
}
