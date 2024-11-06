import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('movies')
export class Movie extends BaseEntity{
  @Column({ name: 'name', type: 'varchar', unique: true })
  name!: string;

  @Column({name: "video", type: 'varchar'})
  video!: string

  @Column({ name: 'rating', type: 'varchar'})
  rating!: number

  @Column({name: "title", type: 'varchar'})
  title!: string

  @Column({name: "description", type: 'varchar'})
  description!: string

  @Column({name: 'release_date',type: Date})
  release_date!: Date

  @Column({name: "is_premium", type: Boolean})
  is_premium!:boolean

}
