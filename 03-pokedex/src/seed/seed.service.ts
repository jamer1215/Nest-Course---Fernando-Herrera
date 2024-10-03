//No olvides mi objetivo - albergar la lógica de negocio y seré llamado en el controller

import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;//instancia de axios, crea una dependencia en mi servicio - proyecto
  //hay varias formas de definir esto

  async executeSeed(){

    
    //hagamos las peticiones http mejor por axios
    const {data} = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')//quiero es sacar la data
    //num pokemon y name del pokemon, desestructurando la vaina lo extraemos facil
    data.results.forEach(({name,url})=>{

      const segments = url.split('/');//con esto veo que la salida puede verse...
      const no:number= +segments[segments.length-2]

      //console.log({name,url})
      //console.log(segments);//...[ 'https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '' ] - consola al hacer get en postman
      console.log({name,no})//{ name: 'bulbasaur', no: 1 } - consola al hacer get en postman

    })

    //console.log(fetch)

    return data.results;
  }
  
}
