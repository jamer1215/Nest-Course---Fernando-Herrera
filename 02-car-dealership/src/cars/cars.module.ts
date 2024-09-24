//agrupador de una caracteristica particular

import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';////automatico haciendo (B)
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService]//automatico haciendo (B)
})
export class CarsModule {}

//s59: en la terminal : nest g res brands --no-spec
//rest api creamos y le decimos que genere los cruds entry points