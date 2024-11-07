import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
import { FavouriteMovie } from 'src/core/entity';
import { FavouriteMovieRepository } from 'src/core/repository/favourite_movie.repository';
import { CreateFavouriteMovieDto, UpdateFavouriteMovieDto } from './dto';
  @Injectable()
  export class FavouriteMovieService {
    constructor(@InjectRepository(FavouriteMovie) private favouriteMovieRepo: FavouriteMovieRepository) {}
  
    async create(createFavouriteMovieDto: CreateFavouriteMovieDto) {
      try {
        const newFavouriteMovie = this.favouriteMovieRepo.create({
          user_id: createFavouriteMovieDto.user_id,
          movie_id: createFavouriteMovieDto.movie_id,
        });
        await this.favouriteMovieRepo.save(newFavouriteMovie);
        return newFavouriteMovie;
      } catch (error) {
        throw new BadRequestException(error);
      }
    }
    async findAll(): Promise<FavouriteMovie[]> {
      try {
        return await this.favouriteMovieRepo.find();
      } catch (error) {
        throw new NotFoundException('Favourite Movie not Found');
      }
    }
  
    async findOne(id: string): Promise<FavouriteMovie | null> {
      try {
        const foundedFavouriteMovie = await this.favouriteMovieRepo.findOne({
          where: { id },
        });
  
        if (!foundedFavouriteMovie) {
          throw new NotFoundException('Favourite Movie Not found');
        }
        return foundedFavouriteMovie;
      } catch (error) {
        throw new BadRequestException('Your id is not valid, Bad request');
      }
    }
  
    async update(id: string, updateFavouriteMovieDto: UpdateFavouriteMovieDto) {
      try {
        const foundedFavouriteMovie = await this.findOne(id);
  
        if (!foundedFavouriteMovie) {
          throw new NotFoundException('Favourite movie not found');
        }
        return await this.favouriteMovieRepo.update(
          { id: id },
          {
            user_id: updateFavouriteMovieDto.user_id,
            movie_id: updateFavouriteMovieDto.movie_id,
          },
        );
      } catch (error) {
        throw new BadRequestException('Bad request error, nothing is changed');
      }
    }
  
    async remove(id: string) {
      try {
        const foundedFavouriteMovie = await this.findOne(id);
  
        if (!foundedFavouriteMovie) {
          throw new NotFoundException('Favourite movie Not Found');
        }
        return await this.favouriteMovieRepo.delete({ id });
      } catch (error) {
        throw new BadRequestException('UUID is not valid');
      }
    }
  }
  