import { IsString, IsEmail, IsBoolean, IsDate, IsEnum, IsOptional, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";  // Swagger import qilindi
import { UserRoles } from "src/common/database/Enums";

export class CreateUserDto {
    
    @ApiProperty({
        description: "User's full name",
        example: "John Doe"
    })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({
        description: "User's email address",
        example: "john.doe@example.com"
    })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({
        description: "Whether the user has a premium account",
        example: true,
        required: false // majburiy emasligini bildiradi
    })
    @IsBoolean()
    @IsOptional() 
    is_premium?: boolean;

    @ApiProperty({
        description: "Last login date of the user",
        example: "2023-10-12T07:20:50.52Z",
        required: false // majburiy emasligini bildiradi
    })
    @IsDate()
    @IsOptional() 
    last_login?: Date;

    @ApiProperty({
        description: "User's role in the system",
        example: UserRoles.USER, // Enum qiymatidan foydalaniladi
        enum: UserRoles,
        required: false
    })
    @IsEnum(UserRoles)
    role!: UserRoles;

    
}
