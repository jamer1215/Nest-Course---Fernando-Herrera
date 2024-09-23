import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);//le mando el modulo principal - app.module
  await app.listen(3000);//localhost:3000
}
main();
