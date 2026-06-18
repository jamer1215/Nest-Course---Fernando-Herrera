// import { PartialType } from '@nestjs/mapped-types';
// import { CreateBrandDto } from './create-brand.dto';

// export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
//comentado pq tendra mas sentido al tener el createbrand con mas de una propiedad
import { IsString, MinLength } from "class-validator";

//si solo necesito actualizar una propiedad
export class UpdateBrandDto {

    @IsString()
    @MinLength(1)
    name:string;

}
