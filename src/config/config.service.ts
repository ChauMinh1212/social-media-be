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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }

  configRedis(): any {
    return {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      store: redisStore,
      db: process.env.REDIS_DB,
      isGlobal: true
    }
  }

  configMinio() {
    return {
      endPoint: process.env.MINIO_ENDPOINT,
      port: +process.env.MINIO_PORT,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    }
  }
}
