import { Column, Entity } from "typeorm";

import { Roles } from "src/common/database/Enums";
import { BaseEntity } from "src/common/database/BaseEntity";

Entity("users")
export class UserEntity extends BaseEntity {

    @Column({
        type: "varchar",
        name: "name",
    })
    name!: string

    @Column({
        type: "varchar",
        name: "email",
    })
    email!: string

    @Column({
        type: "varchar",
        name: "is_premium",
        default: false
    })
    is_premium: boolean

    @Column({
        type: "date",
        name: "last_login",
        default: Date.now,
    })
    last_login: Date

    @Column({
        type: "enum",
        name: "role",
        default: "USER"
    })
    role: Roles
}