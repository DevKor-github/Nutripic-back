import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class ImageToFoodService {
  private readonly openAi: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openAi = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async analyzeImage(image: Express.Multer.File): Promise<string> {
    try {
      const base64Image = image.buffer.toString('base64');

      // const messages = [
      //     { role: 'user', content: "What's in this image?" },
      //     { role: 'user', content: '이 안에 있는 식재료가 뭐가 있는지 다 말해줘.' },
      //     { role: 'user', content: `data:image/jpeg;base64,${base64Image}` },
      // ];

      const completion = await this.openAi.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: "What's in this image?",
              },
              {
                type: 'text',
                text: '이 안에 있는 식재료가 뭐가 있는지 리스트 형식으로 말해줘. 다른 텍스트는 필요없어.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
      });

      const response_data = completion.choices[0].message.content;
      console.log(response_data);
      return response_data;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to analyze image: ${error.message}`
      );
    }
  }
}
