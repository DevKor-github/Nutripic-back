import { Controller, Delete, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/user.decorator';

@ApiTags('Storage')
@ApiBearerAuth()
@Controller('storage')
export class StorageController {
    constructor() {}

    @UseGuards(FirebaseAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    getFood(@User() uid: string){
        
    }

    @UseGuards(FirebaseAuthGuard)
    @Post('/add')
    @HttpCode(HttpStatus.CREATED)
    addFood(@User() uid: string){

    }

    @UseGuards(FirebaseAuthGuard)
    @Delete('/delete')
    @HttpCode(HttpStatus.OK)
    deleteFood(@User() uid: string){
        
    }
}
