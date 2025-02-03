import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/utils/decorator/user.decorator';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '현재 유저 uid 가져오기' })
  @ApiOkResponse({
    type: String,
  })
  @HttpCode(HttpStatus.OK)
  @Get('uid')
  getUid(@User('uid') uid: string): string {
    return uid;
  }

  @ApiOperation({ summary: '유저 uid를 데이터베이스에 추가' })
  @ApiCreatedResponse({ type: String })
  @ApiConflictResponse({ description: '이미 존재하는 uid 입니다.' })
  @ApiBadGatewayResponse({ description: '유저 생성에 실패했습니다.' })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  createUser(@User('uid') uid: string): Promise<string> {
    return this.userService.createUser(uid);
  }

  @ApiOperation({ summary: '유저 uid를 데이터베이스에서 삭제' })
  @ApiNotFoundResponse({ description: '존재하지 않는 uid 입니다.' })
  @ApiOkResponse({
    type: String,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete')
  deleteUser(@User('uid') uid: string): Promise<string> {
    return this.userService.deleteUser(uid);
  }
}
