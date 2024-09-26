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
  })
  );

  await app.listen(3000);
}
bootstrap();
