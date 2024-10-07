import { IsNotEmpty, IsString } from "class-validator"

export class AddFoodDto {
    
    @IsString()
    @IsNotEmpty()
    userId: string

    @IsString()
    @IsNotEmpty()
    storageType: string

    @IsString()
    @IsNotEmpty()
    name: string

}