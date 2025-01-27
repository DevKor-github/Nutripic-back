import { Injectable } from '@nestjs/common';
import { imageFoodListDto } from './dto/imageFoodList.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImageToFoodRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async matchFoodInfo(foodList: string[]): Promise<imageFoodListDto[]> {
    const foodInfo = this.prismaService.foodInfo.findMany({
      where: {
        class2: {
          in: foodList,
        },
      },
    });

    const foodInfoMap = new Map<string, imageFoodListDto>();
    (await foodInfo).forEach(async (food) => {
      const currentDate = new Date();
      const expireDate = new Date(
        currentDate.setDate(currentDate.getDate() + food.expireDate)
      );
      foodInfoMap.set(food.class2, {
        name: food.class2,
        storageType: food.storageType,
        class1: food.class1,
        class2: food.class2,
        expireDate: expireDate.toISOString(),
      });
    });

    return foodList.map((foodName) => {
      if (foodInfoMap.has(foodName)) {
        return foodInfoMap.get(foodName);
      } else {
        return {
          name: foodName,
          storageType: 'fridge',
          class1: '기타',
          class2: '기타',
          expireDate: 'unknown',
        };
      }
    });
  }
}
