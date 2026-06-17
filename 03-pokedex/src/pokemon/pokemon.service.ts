import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';//s77
import { Pokemon } from './entities/pokemon.entity';//s77
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

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
      this.handleExceptions(error)//mejor llamo al metodo que generaliza esta captura de errores.



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

  findAll(paginationDto: PaginationDto) {

    const{limit=10,offset=0}=paginationDto;//desestructuro, predefino ambos elementos con esos valores si no vienen



    return this.pokemonModel.find()
    //paginacion - limites
    // .limit(5)//traelos de 5 en 5
    // .skip(5)//saltate los primeros 5

      //seamos mas generales
    .limit(limit)
    .skip(offset)
    .sort({
      no:1//ordena la columna o ascendentemente (ORDER BY ASC)
    })
    .select('-__v')//le resté la columna __v - no la traigas en la query get
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

  //s80
  async update(termino: string, updatePokemonDto: UpdatePokemonDto) {

    //es el objeto o modelo en el cual puedo hacer una serie de cosas - no es el pokemon persé (?) - modelo de mongoose ofrece.

    const pokemon = await this.findOne(termino);//si pasa de esta linea existe el pokemon
    //si me mandan el nombre del pokemon con mayusculas demás y considerar que ese campo es opcional (si me lo mandan o no)
    
    try {
      if (updatePokemonDto.name){
        updatePokemonDto.name=updatePokemonDto.name.toLowerCase()
  
      }

     await pokemon.updateOne(updatePokemonDto,{new:true})//regresamos el nuevo objeto - importante el new:true
  
    
    } catch (error) {

      this.handleExceptions(error)//mejor llamo al metodo que generaliza esta captura de errores.
      
    }

    
      return {...pokemon.toJSON(),...updatePokemonDto};//esto lo hago pq el updateOne lo que me hace es regresarme la vaina serializada en el postman se ve así, entonces pa q se vea bien bonito
      //lo hice con el dto porque se supone que ese objeto posee la info que quiero actualizar sin usar lo del await pokemon.updateone...
    
  }

  //sesion 82  
  async remove(id: string) {
    // const pokemon = await this.findOne(id);// si tenemos el pokemon (A)
    // await pokemon.deleteOne();//asi de facilito es

      // return {id};

      //manera 1 - s83 (funciona la eliminación bello):
      
      //haciendolo así... qué pasa si por error mando un mongoid de un registro que ni existe?
      //en el postman no da error, tipo sale ok pero ajá la idea es que me digas mira bobo ese id no existe
      // const result = await this.pokemonModel.findByIdAndDelete(id)//se me olvido el await de s83 aca en s84

      //manera 2 - validando el caso borde de tratar de eliminar algo que no existe

      //const result = await this.pokemonModel.deleteOne({_id:id});//me pasa algo similar con lo de la serializacion de veces pasadas

      const {deletedCount} = await this.pokemonModel.deleteOne({_id:id});
      //esto quiere decir si no existe el pokemon - cantidad de registros eliminados
      //lo hago asi para evitar hacer dos llamadas a la BD, por eso no descomente (A) para consultar primero si existia
      if (deletedCount===0){

        throw new BadRequestException(`Pokemon with id "${id}" not found`)

      }

      return ;
    }

  //como vimos en el update y create se nos presenta el error similar de querer hacer la transaccion con una ocurrencia repetida
  //asi que mejor hagamos un metodo particular para eso y no repetir codigo

  private handleExceptions(error:any){//recibe un error de cualquier tipo

    if (error.code===11000){//ese codigo de error corresponde a registro duplicado
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create pokemon - check server logs`)//si es otro error de la BD

  }

}
