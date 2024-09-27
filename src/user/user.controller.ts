import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor() {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getUser() {
    return 'Hello User!';
  }
}
