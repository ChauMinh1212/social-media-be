import { MailerModule } from '@nestjs-modules/mailer';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './auth/auth.module';
import { ConfigModule as ConfigOptionModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MailingModule } from './mailing/mailing.module';

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


@Module({
  imports: [
    //Config 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //TypeOrm
    TypeOrmModule.forRootAsync({
      imports: [ConfigOptionModule], 
      useFactory: (configService: ConfigService) => configService.createTypeOrmOptions(),
      inject: [ConfigService]
    }),
    //Redis
    CacheModule.registerAsync({
      imports: [ConfigOptionModule],
      useFactory: (configService: ConfigService) => configService.configRedis(),
      inject: [ConfigService],
      isGlobal: true
    }),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      template: {
        dir: process.cwd() + '/src/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    CacheModule.register(),
    AuthModule,
    MailingModule,
  ],
})
export class AppModule {}
