import { HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionResponse } from './util/exception';
import { UtilCommonTemplate } from './util/util.common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.PREFIX)
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory(errors: ValidationError[]) {
      return new ExceptionResponse(
        HttpStatus.BAD_REQUEST,
        UtilCommonTemplate.getMessageValidator(errors),
      );
    },
  }))

  const config = new DocumentBuilder()
    .setTitle('Social Media Swagger')
    .setDescription('The social media API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {customSiteTitle: 'Social Media Swagger'});

  await app.listen(process.env.PORT_SERVER, () => {
    console.log(`Server start at port ${process.env.PORT_SERVER}`)
  });

}
bootstrap();
