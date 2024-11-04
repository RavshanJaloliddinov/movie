import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenreDto {
    @IsNotEmpty()
    @IsString()
    product_name!: string
}