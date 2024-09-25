//s51, creamos un dto (recuerda que dto es una clase que tiene el fin de transferir datos con el fin de garantiza que dicha transferencia de datos siga una consistencia en los mismos)
//normalmente los dtos son usados en los controladores y en los servicios para las instancias del tipo DTO - recuerda que los dtos no manejan logica de negocio

import { IsString, IsUUID, IsOptional } from 'class-validator';//aca empezamos a validar

export class UpdateCarDto{//para ejemplo practico de este curso, digo lo que me espero que son el brand y el model


    //@IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string
    
    @IsString({message: `My pana, the brand must be a cool string :/`})//validando que el atributo sea como lo defini - brand: string
    @IsOptional()
    readonly brand?: string;
    
    @IsString({message: `My pana, the model must be a cool string :/`})//validando que el atributo sea como lo defini - model: string
    @IsOptional()
    readonly model?: string;

}