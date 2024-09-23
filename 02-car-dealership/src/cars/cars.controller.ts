import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,} from '@nestjs/common';
import { CarsService } from './cars.service';

//CONTROLADOR: El que escuchará la solicitud de los clientes - POSTMAN y el controlador emite respuesta
@Controller('cars')//especificamente maneja cars
export class CarsController {

    constructor(//tipo lo del charmander - nest crea las instancias automatico
        private readonly carsService: CarsService,//S39 - inyeccion de dependencia: definir una propiedad que tendrá un tipo de dato específico - dependencia en el constructor



    ){}

    //private cars = ['Toyota','Honda','Jeep'];//por ahora no es el lugar que tendre en el arreglo - Sesion35
    //no deberia tener esta data en el controlador - tomalo como una BD
    //hay otras partes de la app que necesitarían consumir dicha data - aca entramos un poco con los servicios


    @Get()//cuando venga una solicitud get al endpoint de car, ejecuta el metodo de getAllCars
    getAllCars(){//si no le pongo el get, entonces en el postman no se verá nada
        //return this.cars;//...:300/cars/N --> en el postman me retorna el elemento de la posición N del arreglo (Ej: N=0 - toyota)
        return this.carsService.findAll();
    }

   
     @Get('/:id')
     //ParseIntPipe - es un Pipe que lo que hace es transformar la vaina en un numero y si me pasa otro dato lanza una exception del tipo BadRequest
    getCarById(@Param('id', ParseIntPipe) id: number){//revisar la parte del pdf: Extraer info de la solicitud (request) - en este caso le digo a nest lee el id que puse en el postman tipo : .../cars/1
        console.log({ id });//imprimirlo como número - lo del +id
        // const carId = parseInt(id); // Convertir el parámetro a número
        // const car = this.cars[carId]; // Buscar el auto por índice
        

      //     // Si no se encuentra el auto en el arreglo, retornar un mensaje de error
      //     if (!car) {
      //         return { message: 'Car not found' }; // Auto no encontrado
      //     }else{        // Retornar el nombre del auto si existe
      //         return { car }; // Respuesta con el auto encontrado
      //     }

      //const idCarrito = parseInt(id);

      //throw new Error ('Auxilio');

      return this.carsService.findOneById(id);
    }

    //S40: Post, Patch Delete - se implementarán a mas profundiran en la seccion/bloque 4 del curso
    //Post: Para mandar info hacia el backend - generalmente se usa para crear un recurso
    //Put y Patch: Para actualización
    @Post()
    createCar(@Body() bodysito:any){//el parametro bodysito (lo llame asi pq quise xd) es para obtener la data de la petición post - lo que puse en la parte de Body en el postman
        return{
            // ok:true,
            // method: 'POST'
            bodysito //regresame el body de la peticion que hice en mi postman
        }

    }
    
    @Patch('/:id')//pa actualizar datos - recuerda que para saber que actualizaré debo buscar/indicar el id
    updateCar(@Param ('id',ParseIntPipe) id:number,//el metodo tambien puede recibir como parametro el id
        @Body() bodysito:any){//el parametro bodysito (lo llame asi pq quise xd) es para obtener la data de la petición post - lo que puse en la parte de Body en el postman
        return{
            bodysito //regresame el body de la peticion que hice en mi postman - patch en este caso
        }

    }

    @Delete('/:id')
    deleteCar (@Param('id', ParseIntPipe) id: number){//necesito el id de la vaina que eliminaré
        return{
            method:'delete',
            id
        }

    }


}//clase sin implementacion en sesion 33- en POSTMAN haciendo /cars da error 404
    