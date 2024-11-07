import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from 'src/core/entity/actor.entity';
import { MovieEntity } from 'src/core/entity/movie.entity';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity, MovieEntity])],
  providers: [ActorService],
  controllers: [ActorController],
})
export class ActorModule {}
