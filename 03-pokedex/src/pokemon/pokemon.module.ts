import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    //conectando el módulo con la BD - entidad pokemon
    MongooseModule.forFeature([{
      name: Pokemon.name,//sale de la extension del documento, no del atributo name como tal
      schema: PokemonSchema,
    }])

  ]
})
export class PokemonModule {}
