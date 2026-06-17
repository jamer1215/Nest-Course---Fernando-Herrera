import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';//creamos esto en el cli en s83 para crear nuestro pipe personalizado
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {

    // console.log({value,metadata})
    
    //usando la funcion de mongoose que si id no tiene la estructura de un MongoID arroja la exception
    if(!isValidObjectId(value)){
      throw new BadRequestException(`${value} is not a valid MongoID`)
    }

    return value;//retorname el id - valor al servicio
  }
}
