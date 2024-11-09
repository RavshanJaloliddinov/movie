import { IsOptional, IsString } from "class-validator";

export class UpdateFavouriteMovieDto {
    @IsString()
    @IsOptional()
    user_id!: string

    @IsString()
    @IsOptional()
    movie_id!: string
}