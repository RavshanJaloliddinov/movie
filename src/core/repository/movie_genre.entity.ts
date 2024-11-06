import { Repository } from "typeorm";
import { MovieGenre } from "../entity";

export type MovieGenreRepository = Repository<MovieGenre>