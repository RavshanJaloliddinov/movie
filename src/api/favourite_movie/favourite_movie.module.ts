import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavouriteMovie } from "src/core/entity";
import { FavouriteMovieController } from "./favourite_movie.controller";
import { FavouriteMovieService } from "./favourite_movie.service";

@Module({
    imports: [TypeOrmModule.forFeature([FavouriteMovie])],
    controllers: [FavouriteMovieController],
    providers: [FavouriteMovieService],
})
export class FavouriteMovieModule{}