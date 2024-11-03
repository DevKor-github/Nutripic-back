import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteFoodDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
