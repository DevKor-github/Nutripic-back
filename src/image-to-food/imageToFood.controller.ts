import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageToFoodService } from './imageToFood.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.guard';

@Controller('image-to-food')
export class ImageToFoodController {
  constructor(private readonly imageToFoodService: ImageToFoodService) {}

  @Post('analyze')
  @Public()
  @UseInterceptors(FileInterceptor('image'))
  async analyzeImage(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
      return {
        message: 'No image uploaded',
      };
    }

    const ingredients = await this.imageToFoodService.analyzeImage(image);
    return { ingredients };
  }
}
