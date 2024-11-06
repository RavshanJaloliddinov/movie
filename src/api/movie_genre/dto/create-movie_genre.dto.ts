import { IsNotEmpty, IsString } from "class-validator";

export class CreateMovieGenreDto {
    @IsNotEmpty()
    @IsString()
    movie_id: string

    @IsNotEmpty()
    @IsString()
    genre_id: string
}