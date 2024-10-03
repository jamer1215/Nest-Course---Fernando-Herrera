//No olvides mi objetivo - albergar la lógica de negocio y seré llamado en el controller

import { Injectable } from '@nestjs/common';


@Injectable()
export class SeedService {

  executeSeed(){
    return "Seed executed"
  }
  
}
