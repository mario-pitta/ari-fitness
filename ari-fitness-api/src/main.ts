/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  const corsConfig: CorsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true,
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.useStaticAssets(path.join(__dirname, 'public'));
  app.setBaseViewsDir(path.join(__dirname, 'public'));
  app.setViewEngine('hbs');


  // app.enableCors(corsConfig);
  await app.listen(3000);
  

}
bootstrap();
