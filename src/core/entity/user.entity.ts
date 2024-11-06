import { Column, Entity } from "typeorm";
import { UserRoles } from "src/common/database/Enums"; 
import { BaseEntity } from "src/common/database/BaseEntity";

@Entity("users")
export class UserEntity extends BaseEntity {

    @Column({
        type: "varchar",
        name: "name",
        nullable: false, 
    })
    name!: string;

    @Column({
        type: "varchar",
        name: "email",
        unique: true, 
        nullable: false,
    })
    email!: string;

    @Column({
        type: "boolean", 
        name: "is_premium",
        default: false,
    })
    is_premium: boolean;

    @Column({
        type: "timestamp", 
        name: "last_login",
        default: () => "CURRENT_TIMESTAMP", 
    })
    last_login: Date;

    @Column({
        type: "enum",
        name: "role",
        enum: UserRoles,
        default: UserRoles.USER, 
    })
    role: UserRoles;
}
