import { Injectable } from '@nestjs/common';


@Injectable()
export class SeedService {

  populateDB(){//cargar cierto servicio - cierto tipo de dato/semilla de info

    return 'SEED executed :)';

  }

}
