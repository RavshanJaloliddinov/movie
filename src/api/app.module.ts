import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config';
import { GenreModule } from './genre/genre.module';
import { MovieModule } from './movie/movie.module';
import { MovieGenreModule } from './movie_genre/movie_genre.module';
import { ActorModule } from './actor/actor.module';
import { MovieActorModule } from './movie_actor/movie_actor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: ["dist/core/entity/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UserModule,
    GenreModule,
    MovieModule,
    MovieGenreModule,
    ActorModule,
    MovieActorModule,
  ],
})
export class AppModule { }
