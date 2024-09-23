import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';////automatico haciendo (B)
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService]//automatico haciendo (B)
})
export class CarsModule {}
