//para sesion 97 - paginación

import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

//validamos los parámetros en el endpoint tipo limite tanto, pero que no me ponga negativo y así

export class PaginationDto{


    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?:number;//opcional


    @IsOptional()
    @IsPositive()
    @IsNumber()
    offset?:number;//opcional

}