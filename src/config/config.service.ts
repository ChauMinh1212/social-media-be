import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { UserEntity } from '../auth/entities/user.entity';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity],
      synchronize: true,
    };
  }

  configRedis(): any{
    return {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      store: redisStore,
      db: process.env.REDIS_DB,
      isGlobal: true
    }
  }
}
