//acuerdate que aca esta la app de nest propiamente

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.setGlobalPrefix('api/vi')//para hacer lo del api/v2 como la gente de pokeApi... en el controller

  await app.listen(3000);
}
bootstrap();
