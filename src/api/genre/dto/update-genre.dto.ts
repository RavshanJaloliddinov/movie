import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class UpdateGenreDto{
    @IsString()
    @IsNotEmpty()
    genre_name: string
}