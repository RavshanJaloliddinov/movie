import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genre')
export class GenreEntity extends BaseEntity{
  @Column({ name: 'genre_name', type: 'varchar' })
  genre_name!: string;
}
