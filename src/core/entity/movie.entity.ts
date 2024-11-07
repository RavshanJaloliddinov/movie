import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, ManyToMany, JoinTable, ManyToOne, OneToOne } from 'typeorm';
import { GenreEntity } from './genre.entity';
import { UserEntity } from './user.entity';
import { FavoriteMovieEntity } from './favorite_movie.entity';
import { ActorEntity } from './actor.entity';
import e from 'express';


@Entity('movies')
export class MovieEntity extends BaseEntity {
  @Column({ name: "video", type: 'varchar' })
  video!: string

  @Column({ name: 'rating', type: 'varchar', nullable: true })
  rating!: number;

  @Column({ name: "title", type: 'varchar', nullable: true })
  title!: string;

  @Column({ name: "description", type: 'varchar', nullable: true })
  description!: string;

  @Column({ name: 'release_date', type: Date, nullable: true })
  release_date!: Date;

  @Column({ name: "is_premium", type: 'boolean', default: true })
  is_premium!: boolean;

  @ManyToMany(() => GenreEntity, (genre) => genre.movies)
  @JoinTable({
    name: 'movie_genre',  // Bu orqali TypeORM 'movie_genre' jadvalini avtomatik yaratadi
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' }
  })
  genres: GenreEntity[];


  @OneToOne(() => FavoriteMovieEntity, (favoriteMovie) => favoriteMovie.movie)
  favoriteMovie!: FavoriteMovieEntity;

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  actors!: ActorEntity[];
  // @ManyToOne(() => UserEntity, user => user.favoriteMovies)
  // user: UserEntity; 
  // @ManyToMany(() => Actor, (actor) => actor.movies) // Actor bilan bog'lanish to'g'rilandi
  // @JoinTable({
  //   name: 'movie_actor',  // Bu orqali TypeORM 'movie_actor' jadvalini avtomatik yaratadi
  //   joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' }
  // })
  // actors: Actor[];
}
