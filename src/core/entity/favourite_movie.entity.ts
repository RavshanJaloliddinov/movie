import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('favourite_movie')
export class FavouriteMovie extends BaseEntity {
  @Column({ name: 'user_id', type: 'varchar', nullable: false })
  user_id!: string;

  @Column({ name: 'movie_id', type: 'varchar', unique: true, nullable: false })
  movie_id!: string;
}
