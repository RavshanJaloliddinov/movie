import { Repository } from "typeorm";
import { Movie } from "../entity";

export type MovieRepository = Repository<Movie>