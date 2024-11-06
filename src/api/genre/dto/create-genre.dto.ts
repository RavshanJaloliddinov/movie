import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenreDto {
    @IsNotEmpty()
    @IsString()
    genre_name!: string
}