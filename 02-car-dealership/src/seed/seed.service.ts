import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';


@Injectable()
export class SeedService {

  constructor(
    private readonly carsService: CarsService,//inyectando el servicio de carro acá en el seed
    private readonly brandsService: BrandsService,
    
  ){}

  populateDB(){//cargar cierto servicio - cierto tipo de dato/semilla de info

    // CARS_SEED
    // BRANDS_SEED
    // this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandsService.fillBrandsWithSeedData(BRANDS_SEED);
    return 'SEED EXITOSO';

  }

}
