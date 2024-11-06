import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsString()
    video!: string

    @IsNotEmpty()
    @IsNumber()
    rating!: number

    @IsNotEmpty()
    @IsString()
    title!: string

    @IsNotEmpty()
    @IsString()
    description!: string

    @IsNotEmpty()
    @IsDate()
    release_date!: Date

    @IsNotEmpty()
    @IsBoolean()
    is_premium!:boolean
}