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
    // JwtModule.register({
    //   secret: config.JWT_SECRET || 'default_secret_key',
    //   signOptions: { expiresIn: config.ACCESS_TOKEN_EXPIRE_TIME },
    // }),
    UserModule,
    UploadModule,
    AuthModule,
    UserModule,
    GenreModule,
    MovieModule,
    MovieGenreModule,
    ActorModule,
    MovieActorModule,
  ],
  providers: [
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD
    }
  ],

})
export class AppModule { }
