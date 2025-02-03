import {
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageToFoodService } from './imageToFood.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.guard';
import { CreateFoodDto } from 'src/storage/dto/createFood.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Image To Food Analysis')
@ApiBearerAuth()
@Controller('image-to-food')
export class ImageToFoodController {
  constructor(private readonly imageToFoodService: ImageToFoodService) {}
  private logger: Logger = new Logger(ImageToFoodController.name);

  @ApiOperation({ summary: '이미지를 분석하여 식재료 리스트 추출' })
  @ApiOkResponse({
    type: CreateFoodDto,
    isArray: true,
    description: '식재료 리스트, storageType으로 분류',
    example: [
      [
        {
          name: '양파',
          storageType: 'fridge',
        },
      ],
      [
        {
          name: '당근',
          storageType: 'freezer',
        },
      ],
      [
        {
          name: '닭고기',
          storageType: 'room',
        },
      ],
    ],
  })
  @Post('analyze')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  async analyzeImage(
    @UploadedFile() image: Express.Multer.File
  ): Promise<CreateFoodDto[][] | { message: string }> {
    this.logger.log(`Analyze image`);
    if (!image) {
      return {
        message: 'No image uploaded',
      };
    }

    return this.imageToFoodService.analyzeImage(image);
  }
}
