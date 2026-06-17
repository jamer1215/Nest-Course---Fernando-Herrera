//No olvides mi objetivo - albergar la lógica de negocio y seré llamado en el controller

import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/httpadapters/axios.adapter';



@Injectable()
export class SeedService {

  constructor(
    @InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>, // Inyectamos el modelo - INSERT S93
    private readonly http:AxiosAdapter
  ) {}

  //en s96 lo pasaremos al axios adapter:

  //private readonly axios: AxiosInstance = axios;//instancia de axios, crea una dependencia en mi servicio - proyecto
  //hay varias formas de definir esto

  async executeSeed(){

    await this.pokemonModel.deleteMany({})//sin condicion en () --> delete * from pokemons;

    
    //hagamos las peticiones http mejor por axios
    //S96: no desestructuraré mas la data más - hecho en axios (regresar solo respuesta)
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')//quiero es sacar la data
    //num pokemon y name del pokemon, desestructurando la vaina lo extraemos facil

    //solucion 2 para insertar varios registros de una sin esperar (await) uno por uno - S95
    const pokemonToInsert:{name:string, no:number}[] =[];//arreglo de registros a insertar
    
         // comentado PARA HACER TAREA S93
     data.results.forEach(({name,url})=>{

      const segments = url.split('/');//con esto veo que la salida puede verse...
      const no:number= +segments[segments.length-2]


      //const pokemon =  this.pokemonModel.create({name,no});//inserta los datos a la BD que quiero del pokemon

      //en parte 1 me falto:
      // insertPromisesArray.push(
      //   this.pokemonModel.create({name,no})
      // )

      //parte 2 hacemos algo similar a lo que me faltó en parte 1:
      pokemonToInsert.push({name, no});// [{name:bulbasaur, no:1},...]



    })

     await this.pokemonModel.insertMany(pokemonToInsert)//insercion con muchos registros pero hace todo de uan - solucion 2
     //equivalente a: INSERT INTO pokemons (name,no) VALUES
     //...FILA 1
     //...FILA 2
     //...FILA N  
        return 'Seed ejecutado!';
      }


  }
  
