import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateFoodDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsInt()
    amount: number

    @IsDateString()
    expireDate: string

}