import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: ["dist/core/entity/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UserModule
  ],
})
export class AppModule { }
