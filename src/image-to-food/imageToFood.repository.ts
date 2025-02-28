import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFoodDto } from 'src/storage/dto/createFood.dto';

@Injectable()
export class ImageToFoodRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async matchFoodInfo(foodList: string[]): Promise<CreateFoodDto[]> {
    const foodInfo = await this.prismaService.foodInfo.findMany({
      where: {
        class2: {
          in: foodList,
        },
      },
    });

    const foodInfoMap = new Map<string, CreateFoodDto>();
    foodInfo.map((food) => {
      const currentDate = new Date();
      const expireDate = new Date(currentDate);
      expireDate.setDate(expireDate.getDate() + food.expireDate);
      foodInfoMap.set(food.class2, {
        name: food.class2,
        storageType: food.storageType,
        class1: food.class1,
        class2: food.class2,
        icon: food.icon,
        addedDate: currentDate.toISOString(),
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
          icon: 'null',
          addedDate: new Date().toISOString(),
        };
      }
    });
  }
}
