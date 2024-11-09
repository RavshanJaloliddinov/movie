import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RedisService } from "../../common/redis/redis.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/core/entity/user.entity";
import { UserService } from "../user/user.service";
import { MailService } from "./mail.service";
import { PassportModule } from "@nestjs/passport";
import { DeviceService } from "./device/device.service";
import { DeviceEntity } from "src/core/entity/device.entity";
import { DeviceController } from "./device/device.controller";
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, DeviceEntity]),
    PassportModule,
    JwtModule,
  ],
  providers: [
    AuthService,
    RedisService,
    UserService,
    MailService,
    DeviceService,
  ],
  controllers: [AuthController, DeviceController],
})
export class AuthModule { }
