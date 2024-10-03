//para sesion 97 - paginación

import { IsOptional, IsPositive, Min } from "class-validator";

//validamos los parámetros en el endpoint tipo limite tanto, pero que no me ponga negativo y así

export class PaginationDto{


    @IsOptional()
    @IsPositive()
    @Min(1)
    limit:number;


    @IsOptional()
    @IsPositive()
    offset:number;

}