import { Test, TestingModule } from '@nestjs/testing';
import { ImageToFoodController } from './image-to-food.controller';

describe('ImageToFoodController', () => {
  let controller: ImageToFoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageToFoodController],
    }).compile();

    controller = module.get<ImageToFoodController>(ImageToFoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
