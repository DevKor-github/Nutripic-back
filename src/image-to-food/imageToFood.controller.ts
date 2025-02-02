import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageToFoodService } from './imageToFood.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.guard';
import { CreateFoodDto } from 'src/storage/dto/createFood.dto';

@Controller('image-to-food')
export class ImageToFoodController {
  constructor(private readonly imageToFoodService: ImageToFoodService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('image'))
  async analyzeImage(
    @UploadedFile() image: Express.Multer.File
  ): Promise<CreateFoodDto[] | { message: string }> {
    if (!image) {
      return {
        message: 'No image uploaded',
      };
    }

    return this.imageToFoodService.analyzeImage(image);
  }
}
