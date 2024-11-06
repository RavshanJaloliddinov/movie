import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('movie_genre')
export class MovieGenre extends BaseEntity {
  @Column({ name: 'movie_id', type: 'varchar'})
  movie_id!: string;

  @Column({ name: 'genre_id', type: 'varchar'  })
  genre_id!: string;
}
