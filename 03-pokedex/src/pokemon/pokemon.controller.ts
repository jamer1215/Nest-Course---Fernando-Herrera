import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  // @HttpCode(200)//si quiero que retorne los codigos de las requests (Sean errores o no) particulares y no los predeterminados
  @HttpCode(HttpStatus.OK)//al escribir el . vemos los tipos de httpstatus si no me los sé de memoria
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  //s79 vamos a meternos acá 
  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

    //es el termino de busqueda, no el id - S79
  @Get(':termino')
  findOne(@Param('termino') termino: string) {
    return this.pokemonService.findOne(termino);
  }

  @Patch(':termino')
  update(@Param('termino') termino: string, @Body() updatePokemonDto: UpdatePokemonDto) {

    return this.pokemonService.update(termino, updatePokemonDto);
  }

  @Delete(':id')//no olvides que los pipes lo que hacen es transformarte una data - s83 TENEMOS Q CREAR UN PIPE TIPO ParseMongoID
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
