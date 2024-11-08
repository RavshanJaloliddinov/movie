import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreEntity, MovieEntity, ActorEntity } from 'src/core/entity';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import {
  ActorRepository,
  GenreRepository,
  MovieRepository,
} from 'src/core/repository';
import { UploadService } from '../file/file.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepo: MovieRepository,
    @InjectRepository(GenreEntity)
    private readonly genreRepository: GenreRepository,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: ActorRepository,
    private readonly uploadService: UploadService,  // Inject the UploadService
  ) {}

  async create(createMovieDto: CreateMovieDto, videoFile: Express.Multer.File) {
    try {
      // Upload video file using the UploadService
      console.log(1)
      const uploadedFile = await this.uploadService.uploadFile({
        file: videoFile,
        destination: 'uploads/videos', // Specify the directory to save the video
      });
      
      
      const newMovie = this.movieRepo.create({
        video: uploadedFile.file,  // Save the file URL to the 'video' field
        rating: createMovieDto.rating,
        title: createMovieDto.title,
        description: createMovieDto.description,
        release_date: createMovieDto.release_date,
        is_premium: createMovieDto.is_premium,
      });

      await this.movieRepo.save(newMovie);
      return newMovie;
    } catch (error) {
      console.log(error)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepo.find({
      relations: ['genres', 'actors'],
    });
  }

  async findOne(id: string): Promise<MovieEntity | null> {
    const foundedMovie = await this.movieRepo.findOne({
      where: { id },
      relations: ['genres', 'actors'],
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

  // Movie'ga Genre qo'shish funksiyasi
  async addGenreToMovie(movieId: string, genreId: string): Promise<MovieEntity> {
    const movie = await this.movieRepo.findOne({
      where: { id: movieId },
      relations: ['genres'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const genre = await this.genreRepository.findOne({ where: { id: genreId } });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${genreId} not found`);
    }

    if (!movie.genres.some((existingGenre) => existingGenre.id === genre.id)) {
      movie.genres.push(genre);
      await this.movieRepo.save(movie);
    }

    return movie;
  }

  async removeGenreFromMovie(movieId: string, genreId: string): Promise<MovieEntity> {
    const movie = await this.movieRepo.findOne({
      where: { id: movieId },
      relations: ['genres'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const genreIndex = movie.genres.findIndex(
      (existingGenre) => existingGenre.id === genreId,
    );
    if (genreIndex > -1) {
      movie.genres.splice(genreIndex, 1);
      await this.movieRepo.save(movie);
    }

    return movie;
  }

  // Movie'ga Actor qo'shish funksiyasi
  async addActorToMovie(movieId: string, actorId: string): Promise<MovieEntity> {
    const movie = await this.movieRepo.findOne({
      where: { id: movieId },
      relations: ['actors'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const actor = await this.actorRepository.findOne({ where: { id: actorId } });
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${actorId} not found`);
    }

    if (!movie.actors.some((existingActor) => existingActor.id === actor.id)) {
      movie.actors.push(actor);
      await this.movieRepo.save(movie);
    }

    return movie;
  }

  async removeActorFromMovie(movieId: string, actorId: string): Promise<MovieEntity> {
    const movie = await this.movieRepo.findOne({
      where: { id: movieId },
      relations: ['actors'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const actorIndex = movie.actors.findIndex(
      (existingActor) => existingActor.id === actorId,
    );
    if (actorIndex > -1) {
      movie.actors.splice(actorIndex, 1);
      await this.movieRepo.save(movie);
    }

    return movie;
  }
}
