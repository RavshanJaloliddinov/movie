import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity } from "typeorm";

@Entity('actor')
export class Actor extends BaseEntity{
    @Column({name: 'name', type: 'varchar',unique: true})
    name!: string;

    @Column({name: 'biography', type: 'text'})
    biography!: string
}