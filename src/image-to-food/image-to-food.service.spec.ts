import { Test, TestingModule } from '@nestjs/testing';
import { ImageToFoodService } from './image-to-food.service';

describe('ImageToFoodService', () => {
  let service: ImageToFoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageToFoodService],
    }).compile();

    service = module.get<ImageToFoodService>(ImageToFoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
