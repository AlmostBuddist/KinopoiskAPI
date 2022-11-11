import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/App/app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentationConfig = new DocumentBuilder()
    .setTitle('Kinopoisk Vladislav Syomkin')
    .build();
  const document = SwaggerModule.createDocument(app, documentationConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get('App.port') || 8080);
}
bootstrap();
