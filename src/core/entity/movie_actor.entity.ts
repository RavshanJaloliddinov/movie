import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('movie_actor')
export class MovieActor extends BaseEntity {
  @Column({ name: 'movie_id', type: 'varchar' })
  movie_id!: string;

  @Column({ name: 'actor_id', type: 'varchar' })
  actor_id!: string;
}
