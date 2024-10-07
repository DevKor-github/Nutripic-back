import { IsString } from "class-validator";

export class AddFoodDto {
    @IsString()
    foodId: string
}