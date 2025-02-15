import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ImageToFoodRepository } from './imageToFood.repository';
import { CreateFoodDto } from 'src/storage/dto/createFood.dto';
import { ChatCompletionContentPart } from 'openai/resources';

@Injectable()
export class ImageToFoodService {
  private readonly openAi: OpenAI;
  constructor(
    private readonly configService: ConfigService,
    private readonly imageToFoodRepository: ImageToFoodRepository
  ) {
    this.openAi = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async analyzeImage(
    images: Express.Multer.File[]
  ): Promise<CreateFoodDto[][]> {
    try {
      const base64Images = images.map((image) =>
        image.buffer.toString('base64')
      );

      const content: ChatCompletionContentPart[] = [
        {
          type: 'text',
          text: "What's in this image?",
        },
        {
          type: 'text',
          text: '모든 사진에 있는 식재료가 뭐가 있는지 하나의 리스트(예: - 토마토\n) 형식으로 말해줘. 다른 텍스트는 필요없어.',
        },
      ];

      base64Images.forEach((base64Image) => {
        content.push({
          type: 'image_url',
          image_url: { url: `data:image/jpeg;base64,${base64Image}` },
        });
      });

      const completion = await this.openAi.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: content,
          },
        ],
        max_tokens: 300,
      });

      const response_data = completion.choices[0].message.content;
      //ex: - 감자\n - 토마토\n - 당근

      const food_list = response_data
        .split('\n')
        .map((food) => food.replace('- ', ''));
      // ex: ['감자', '토마토', '당근']

      const foodInfo =
        await this.imageToFoodRepository.matchFoodInfo(food_list);
      const foodInfoByStorage = [[], [], []];
      foodInfo.forEach((food) => {
        if (food.storageType === 'fridge') {
          foodInfoByStorage[0].push(food);
        } else if (food.storageType === 'freezer') {
          foodInfoByStorage[1].push(food);
        } else {
          foodInfoByStorage[2].push(food);
        }
      });
      return foodInfoByStorage; //fridge, freezer, room 순서
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to analyze image: ${error.message}`
      );
    }
  }
}
