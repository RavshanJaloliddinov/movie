import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieGenre } from 'src/core/entity';
import { MovieGenreRepository } from 'src/core/repository';
import { CreateMovieGenreDto } from './dto';

@Injectable()
export class MovieGenreService {
  constructor(
    @InjectRepository(MovieGenre) private movieGenreRepo: MovieGenreRepository,
  ) {}

  async create(createMovieGenreDto: CreateMovieGenreDto) {
    const newMovieGenre = this.movieGenreRepo.create({
      movie_id: createMovieGenreDto.movie_id,
      genre_id: createMovieGenreDto.genre_id,
    });

    await this.movieGenreRepo.save(newMovieGenre);
    return newMovieGenre;
  }

  async findAll(): Promise<MovieGenre[]> {
    return await this.movieGenreRepo.find();
  }

  async findOne(id: string): Promise<MovieGenre | null> {
    const foundedMovieGenre = this.movieGenreRepo.findOne({
      where: { id },
    });
    if (!foundedMovieGenre) {
      throw new NotFoundException('Movie_Genre Not Found');
    }

    return foundedMovieGenre;
  }

  async remove(id: string) {
    const foundedMovieGenre = this.findOne(id);

    if (!foundedMovieGenre) {
      throw new NotFoundException('Movie Genre Not Found');
    }
    return await this.movieGenreRepo.delete({ id });
  }
}
