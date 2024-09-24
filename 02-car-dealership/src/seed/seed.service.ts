import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';


@Injectable()
export class SeedService {

  populateDB(){//cargar cierto servicio - cierto tipo de dato/semilla de info

    // CARS_SEED
    // BRANDS_SEED

    return 'SEED EXITOSO';

  }

}
