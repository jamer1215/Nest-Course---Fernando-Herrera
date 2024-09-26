import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose'//para que la entidad sea un documento - arq. con la que Mongo trabaja

@Schema() //para indicar que esto es un esquema de BD
export class Pokemon extends Document{//no olvides que esto es la representacion de lo que grabamos en la BD - pudiera verse como una tabla
    
    //id:string //Mongo me lo da - no lo pongo

    @Prop({//reglas de integridad
        unique:true,
        index:true,
    })
    name:string;

    @Prop({//reglas de integridad
        unique:true,
        index:true,
    })
    no:number;//numero de pokemon


}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);//exporando un esquema que dice a la BD: estas son las definiciones que quiero, estas son las columnas y demás
