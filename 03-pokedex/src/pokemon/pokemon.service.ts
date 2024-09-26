import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';//s77
import { Pokemon } from './entities/pokemon.entity';//s77
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )//inyectar modelos en el servicio
    private readonly pokemonModel: Model<Pokemon>//iny dependencia
  ){}

  //s77 usaremos el dto para usarlo para la insercion en la BD con el modelo ya listo y conectado
  async create(createPokemonDto: CreatePokemonDto) {//las inserciones en la BD son asincronas
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase(); //pa pasarlo a minuscula

    //hagamos inserciones ahora sin validaciones - cortico:

    try {

      const pokemon =  await this.pokemonModel.create(createPokemonDto);//inserta los datos a la BD que quiero del pokemon

      return pokemon;//retorno el pokemon insertado
    } catch (error) {
      if (error.code===11000){//ese codigo de error corresponde a registro duplicado
        throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
      }
    console.log(error)
    throw new InternalServerErrorException(`Can't create pokemon - check server logs`)//si es otro error de la BD


  }
}
//   haciendo el insert - post en el postman de:

//   {
//     "no": 2,
//     "name": "Bulbasaur"
// }

// me retorna:

// {
//   "name": "bulbasaur",
//   "no": 2,
//   "_id": "66f4f2572aa5931ae8e9dd8b",
//   "__v": 0
// }

  findAll() {
    return `This action returns all pokemon`;
  }

  //s79 
  async findOne(termino: string) {
    let pokemon: Pokemon;//esta variable de pokemon es del tipo de mi entidad

    //verificamos si el termino SÍ es un numero
    if (!isNaN(+termino)){

      pokemon = await this.pokemonModel.findOne({no:termino}); //usamos la columna del numero pa buscar
     }
      //busqueda por MongoID

      if (!pokemon && isValidObjectId(termino)){

        pokemon = await this.pokemonModel.findById(termino);

      } //validamos si es un valido mongoID con esta funcion nativa

      //busqueda por name
      if(!pokemon){
        pokemon = await this.pokemonModel.findOne({name: termino.toLowerCase().trim()})
      }//quiere decir que no encontro el pokemon por otro metodo

      //no encontramos nada
      if (!pokemon) throw new NotFoundException (`Pokemon with id, name or no"${termino}" not found`)




    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
