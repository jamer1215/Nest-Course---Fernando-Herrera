import { join } from 'path';//importado - de node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';//importado
import { PokemonModule } from './pokemon/pokemon.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    }),
    PokemonModule],

})
export class AppModule {}
