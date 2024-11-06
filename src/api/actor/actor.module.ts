import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Actor } from "src/core/entity";
import { ActorService } from "./actor.service";
import { ActorController } from "./actor.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Actor])],
    controllers: [ActorController],
    providers:[ActorService]
})
export class ActorModule{}