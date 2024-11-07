import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from 'src/core/entity/actor.entity';
import { MovieEntity } from 'src/core/entity/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async createActor(name: string, biography: string): Promise<ActorEntity> {
    const actor = this.actorRepository.create({ name, biography });
    return this.actorRepository.save(actor);
  }

  async getActors(): Promise<ActorEntity[]> {
    return this.actorRepository.find({ relations: ['movies'] });
  }

  async addActorToMovie(actorId: string, movieId: string): Promise<ActorEntity> {
    const actor = await this.actorRepository.findOneOrFail({ where: { id: actorId }, relations: ['movies'] });
    const movie = await this.movieRepository.findOneOrFail({ where: { id: movieId } });
    actor.movies.push(movie);
    return this.actorRepository.save(actor);
  }
}
