import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RedisService } from "../../common/redis/redis.service";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/core/entity/user.entity";
import { config } from "src/config";
import { UserService } from "../user/user.service";
import { MailService } from "./mail.service";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule
  ],
  providers: [
    AuthService,
    RedisService,
    UserService,
    MailService,
  ],
  controllers: [AuthController],
})
export class AuthModule { }
