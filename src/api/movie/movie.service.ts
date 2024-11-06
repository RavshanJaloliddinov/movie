import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/core/entity';
import { Repository } from 'typeorm';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class MovieService {
  constructor(@InjectRepository(Movie) private movieRepo: Repository<Movie>) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      const newMovie = this.movieRepo.create({
        name: createMovieDto.name,
        video: createMovieDto.video,
        rating: createMovieDto.rating,
        title: createMovieDto.title,
        description: createMovieDto.description,
        release_date: createMovieDto.release_date,
        is_premium: createMovieDto.is_premium,
      });

      await this.movieRepo.save(newMovie);
      return newMovie;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepo.find();
  }

  async findOne(id: string): Promise<Movie | null> {
    const foundedMovie = await this.movieRepo.findOne({
      where: { id },
    });

    if (!foundedMovie) {
      throw new NotFoundException('Movie not found');
    }
    return foundedMovie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const foundedMovie = await this.findOne(id);

    if (!foundedMovie) {
      throw new NotFoundException('Movie Not Found');
    }
    return await this.movieRepo.update(
      { id: id },
      {
        name: updateMovieDto?.name,
        video: updateMovieDto?.video,
        rating: updateMovieDto?.rating,
        title: updateMovieDto?.title,
        description: updateMovieDto?.description,
        release_date: updateMovieDto?.release_date,
        is_premium: updateMovieDto?.is_premium,
      },
    );
  }

  async remove(id: string) {
    const foundedMovie = await this.findOne(id);

    if (!foundedMovie) {
      throw new NotFoundException('Movie not found');
    }
    return await this.movieRepo.delete({ id });
  }
}
