import { Module } from '@nestjs/common';
import { ImageToFoodController } from './imageToFood.controller';
import { ImageToFoodService } from './imageToFood.service';
import { ImageToFoodRepository } from './imageToFood.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ImageToFoodController],
  providers: [PrismaService, ImageToFoodService, ImageToFoodRepository],
})
export class ImageToFoodModule {}
