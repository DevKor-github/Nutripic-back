import { Module } from '@nestjs/common';
import { ImageToFoodController } from './image-to-food.controller';
import { ImageToFoodService } from './image-to-food.service';

@Module({
  controllers: [ImageToFoodController],
  providers: [ImageToFoodService]
})
export class ImageToFoodModule {}
