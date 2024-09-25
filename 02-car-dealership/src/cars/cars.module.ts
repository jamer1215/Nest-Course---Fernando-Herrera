//agrupador de una caracteristica particular

import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';////automatico haciendo (B)
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService],//automatico haciendo (B)
  exports: [CarsService]//s63: como el modulo de seed utilizará elementos o servicios de este módulo debo configurar el exporte
  //en el modulo origen que seria cars, y paso en la lista que cosas se van a exportar para que el seed lo use 
  //asi arreglamos el error de la terminal
})
export class CarsModule {}

//s59: en la terminal : nest g res brands --no-spec
//rest api creamos y le decimos que genere los cruds entry points