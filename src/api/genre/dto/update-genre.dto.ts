import { IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateGenreDto{
    @IsString()
    @IsOptional()
    genre_name: string
}