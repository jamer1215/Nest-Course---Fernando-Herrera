//No olvides mi objetivo - albergar la lógica de negocio y seré llamado en el controller

import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';



@Injectable()
export class SeedService {

  constructor(
    @InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>, // Inyectamos el modelo - INSERT S93
  ) {}

  private readonly axios: AxiosInstance = axios;//instancia de axios, crea una dependencia en mi servicio - proyecto
  //hay varias formas de definir esto

  async executeSeed(){

    await this.pokemonModel.deleteMany({})//sin condicion en () --> delete * from pokemons;

    
    //hagamos las peticiones http mejor por axios
    const {data} = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')//quiero es sacar la data
    //num pokemon y name del pokemon, desestructurando la vaina lo extraemos facil

    //solucion 1 para insertar varios registros de una sin esperar (await) uno por uno - S95
    const insertPromisesArray =[];
    
         // comentado PARA HACER TAREA S93
     data.results.forEach(({name,url})=>{

      const segments = url.split('/');//con esto veo que la salida puede verse...
      const no:number= +segments[segments.length-2]


      const pokemon =  this.pokemonModel.create({name,no});//inserta los datos a la BD que quiero del pokemon


    })

    await Promise.all(insertPromisesArray);//para insertar todo la vaina simultaneo

        
        return 'Seed ejecutado!';
      }


  }
  
