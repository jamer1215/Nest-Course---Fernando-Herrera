import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);//le mando el modulo principal - app.module --> APP DE NEST

  //validation pipe a nivel global - S49: Para cuando trabaje con distintos dtos en toda la app y no estar copiando y pegando
  //esta haciendo la validacion de que en model no ponga en el postman modeL pero lo pongo globalmente
  //para otros paquetes o clases dto que vaya creando a nivel global del proyecto usen pipes de validacion tipo IsString
  app.useGlobalPipes(//S49: COPIADO DEL PDF DE FERNANDO
    new ValidationPipe({
     whitelist: true,//con esto solo deja la data esperando, si en el postman intento poner atributos/data demás
     //no da error pero en el request solo guarda ejemplo brand y model - remover data basura
     forbidNonWhitelisted: true,//habilitando este pana si intento hacer post en el postman de atributos/data
     //demas de una me dice mira hermano los que pusiste demás no deberian existir/estar.
    }),
  )  

  await app.listen(3000);//localhost:3000
}
main();
