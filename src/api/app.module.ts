import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // JwtModule import qilindi

import { UserModule } from './user/user.module';
import { config } from 'src/config';
import { UploadModule } from './file/file.module';
import { RedisService } from 'nestjs-redis';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: ["dist/core/entity/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    RedisModule.forRoot({
      type: "single",
      options: {
        port: 6380,
        host: "localhost"
      }
    }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET, // .env faylidan JWT sirini olish
    //   signOptions: { expiresIn: '1h' }, // Tokenning amal qilish muddati
    // }),
    UserModule,
    UploadModule,
    AuthModule,
  ],
  
})
export class AppModule {}
