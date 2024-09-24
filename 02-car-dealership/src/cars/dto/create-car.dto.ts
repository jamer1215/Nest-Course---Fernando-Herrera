//s47: un dto no es más que una clase normal solo que tendrá el nombre de este archivo
//proposito del dto: comprobar que lo que recibo haciendo post cumpla la estructura pertinente
//ej: si yo defini un atributo model entonces en el body no pongas modeL, etc.
//dto es clase y no interface porque tambien permite hacer validaciones en cuanto a la data - cosa que no puedo con interface
import { IsString, MinLength } from 'class-validator';//aca empezamos a validar

export class CreateCarDto{//para ejemplo practico de este curso, digo lo que me espero que son el brand y el model

    @IsString({message: `My pana, the brand must be a cool string :/`})//validando que el atributo sea como lo defini - brand: string
    readonly brand: string;
    
    @IsString({message: `My pana, the model must be a cool string :/`})//validando que el atributo sea como lo defini - model: string
    @MinLength(3)//S49: Hermano, que este atributo tenga minimo tres letras por favor.
    readonly model: string;

}