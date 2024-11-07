import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { config } from 'src/config';
import { UploadModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { CheckAuthGuard } from './auth/user/check-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { GenreModule } from './genre/genre.module';
import { MovieModule } from './movie/movie.module';
// import { MovieGenreModule } from './movie_genre/movie_genre.module';
import { ActorModule } from './actor/actor.module';
// import { MovieActorModule } from './movie_actor/movie_actor.module';
import { FavoriteMovieModule } from './favorite_movies/favorite_movies.module';
import { WatchedMovieModule } from './watched_movies/watched_movies.module';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: ["dist/core/entity/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads', // Fayllar saqlanadigan joy
    }),
    RedisModule.forRoot({
      type: "single",
      options: {
        port: 6380,
        host: "localhost"
      }
    }),
    JwtModule.register({
      secret: config.JWT_SECRET,
      global: true,
    }),
    UploadModule,
    AuthModule,
    UserModule,
    GenreModule,
    MovieModule,
    ActorModule,
    FavoriteMovieModule,
    WatchedMovieModule,
  ],
  providers: [
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD
    }
  ],

})
export class AppModule { }
