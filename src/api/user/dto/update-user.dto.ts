import { IsString, IsEmail, IsBoolean, IsDate, IsEnum, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Roles } from "src/common/database/Enums";

export class UpdateUserDto {
    
    @ApiProperty({
        description: "User's full name",
        example: "Jane Doe",
        required: false
    })
    @IsString()
    @IsOptional() // Update uchun majburiy emas
    name?: string;

    @ApiProperty({
        description: "User's email address",
        example: "jane.doe@example.com",
        required: false
    })
    @IsEmail()
    @IsOptional() // Update uchun majburiy emas
    email?: string;

    @ApiProperty({
        description: "Whether the user has a premium account",
        example: false,
        required: false
    })
    @IsBoolean()
    @IsOptional() 
    is_premium?: boolean;

    @ApiProperty({
        description: "Last login date of the user",
        example: "2024-11-05T07:20:50.52Z",
        required: false
    })
    @IsDate()
    @IsOptional() 
    last_login?: Date;

    @ApiProperty({
        description: "User's role in the system",
        example: Roles.ADMIN,
        enum: Roles,
        required: false
    })
    @IsEnum(Roles)
    @IsOptional() 
    role?: Roles;
}
