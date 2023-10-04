import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.PREFIX)

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
