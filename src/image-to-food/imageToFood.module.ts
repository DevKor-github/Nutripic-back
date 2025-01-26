import { Module } from '@nestjs/common';
import { ImageToFoodController } from './imageToFood.controller';
import { ImageToFoodService } from './imageToFood.service';

@Module({
  controllers: [ImageToFoodController],
  providers: [ImageToFoodService],
})
export class ImageToFoodModule {}
