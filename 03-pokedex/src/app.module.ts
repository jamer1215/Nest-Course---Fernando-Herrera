import { join } from 'path';//importado - de node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';//importado
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    }),

    //creemos la referencia de la bd S74 - luego lo haremos con vars. de entorno
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

    PokemonModule,

    CommonModule],

})
export class AppModule {}
