import { MailerModule } from '@nestjs-modules/mailer';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule as ConfigOptionModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MailingModule } from './mailing/mailing.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UploadModule } from './upload/upload.module';
import { MinioModule } from 'nestjs-minio-client';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { SmsModule } from './sms/sms.module';
import { HttpConfigModule } from './http/http.module';
import * as moment from 'moment-timezone';


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
    //Minio
    MinioModule.registerAsync({
      imports: [ConfigOptionModule],
      useFactory: (configService: ConfigService) => configService.configMinio(),
      inject: [ConfigService],
      isGlobal: true
    }),
    CacheModule.register(),
    AuthModule,
    MailingModule,
    UploadModule,
    UserModule,
    PostModule,
    CommentModule,
    SmsModule,
    HttpConfigModule,
  ],
  providers: [
    {
      provide: 'moment-timezone',
      useValue: moment.tz.setDefault('Asia/Ho_Chi_Minh'),
    },
  ]
})
export class AppModule {}
