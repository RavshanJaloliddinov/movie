import { IsNotEmpty, IsString } from "class-validator";

export class CreateFavouriteMovieDto {
    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsString()
    @IsNotEmpty()
    movie_id: string
}