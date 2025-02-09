import {
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImageToFoodService } from './imageToFood.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.guard';
import { CreateFoodDto } from 'src/storage/dto/createFood.dto';
import {
  ApiBearerAuth,
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
  @UseInterceptors(FilesInterceptor('image', 5))
  async analyzeImage(
    @UploadedFiles() images: Array<Express.Multer.File>
  ): Promise<CreateFoodDto[][] | { message: string }> {
    this.logger.log(`Analyze image`);
    if (!images) {
      return {
        message: 'No image uploaded',
      };
    }

    return this.imageToFoodService.analyzeImage(images);
  }
}
