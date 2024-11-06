import { IsNotEmpty, IsString } from "class-validator";

export class UpdateActorDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    biography: string
}