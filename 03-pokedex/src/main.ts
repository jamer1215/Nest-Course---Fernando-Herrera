//acuerdate que aca esta la app de nest propiamente

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.setGlobalPrefix('api/v2')//para hacer lo del api/v2 como la gente de pokeApi... en el controller

app.useGlobalPipes(
  new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform:true,//permiteme transformar el tipo de dato sobre la info que fluye por los DTOs
  transformOptions:{
    enableImplicitConversion:true,//la que busco para evitar que el limit=10 el 10 no se lea tipo string en el endpoint (s98)
  }
  })
  );

  await app.listen(3000);
}
bootstrap();
