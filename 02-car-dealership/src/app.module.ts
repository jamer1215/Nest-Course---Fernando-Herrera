//archivo con el que me quedaré cuando creo el proyecto por primera vez

import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';//esto se supone que debe generarse automático al hacer (A)
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { BrandsModule } from './brands/brands.module';//generado auto. s59
import { SeedModule } from './seed/seed.module';//lo hice a mano S61


@Module({//building b. de Nest - este es el modulo principal de la app
  imports: [CarsModule, BrandsModule,SeedModule],//agregar la importación de CarsModule se supone que debe generarse automático al hacer (A)
  // controllers: [AppController],
  // providers: [AppService],
  controllers: [],
  providers: [],
  exports: [],//lo puso fernando
})
export class AppModule {}

//SESIÓN 23:

//en la terminal ejecuta el comando: nest --h para ver los distintos comandos y elementos que puedes generar
//revisar el PDF - ESTRUCTURA DE MODULO RECOMENDADO
//(A) en la terminal creamos un módulo - fernando: nest g mo cars --> con esto creamos modulos automatizadamente
//(B) una vez creado el módulo, crearemos un controller en la terminal - fernando: nest g co cars