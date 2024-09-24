//S38: clase comun y corriente con la peculiaridad de que se puede inyectar
//todo servicio es un provider, mas no viceversa necesariamente
//MANEJA LA LOGICA DEL NEGOCIO

import { BadRequestException, Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { Car } from './interfaces/car.interfaces';//importamos la interface car
import { v4 as uuid} from 'uuid'//importamos una funcion que genera UUIDs
import { CreateCarDto, UpdateCarDto } from './dto';//englobado en el archivo index para mas comodidad


//decorador - dice que clase es inyectable
@Injectable()
export class CarsService {
    private cars: Car[] = [//array de "objetos" del tipo interface Car
        {
            id: uuid(),//cambiandoloooo
            brand: 'Toyota',
            model: 'Corolla',
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee',
        },
    ];

    findAll(){
        return this.cars;
    }


    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id); // Busca el auto con id: find() es una función de los arreglos de JavaScript
        // que se utiliza para encontrar el primer elemento de un arreglo que cumpla una condición.
        //Este método recibe una función de callback que será ejecutada para cada elemento del arreglo. 
        //El find() detiene su ejecución y devuelve el primer elemento que cumpla con la condición.
        
        //car => car.id === id:

        // Esta es la función de callback que se pasa como argumento a find().
        // car: Es el elemento actual del arreglo en cada iteración. En este caso, será un objeto de auto, como { id: 1, brand: 'Toyota', model: 'Corolla' }.
        // car.id === id: Aquí estamos verificando si el id del auto actual (es decir, car.id) es igual al id que se pasó como argumento a la función findById.

        //validacion caso borde:
        if (!car) {
            //S39 - Exception filters
            throw new NotFoundException(`Car with id '${id}' not found`); // Si no lo encuentra, retorna mensaje de error
        }
        return car; // Si lo encuentra, devuelve el auto
    }

// Implementamos el método create - TAREA
   create(createCarDto: CreateCarDto) {
      // Generamos un nuevo ID UUID
      const newCar = {
          id: uuid(), // Generar un ID único con UUID v4
          ...createCarDto // Desestructuramos las propiedades del DTO (brand, model) sino definelo uno por uno
       };

       // Añadimos el nuevo carro a la lista de carros
       this.cars.push(newCar);

       // Retornamos el nuevo carro creado
       return newCar;
  }

  update(id:string,updateCarDto:UpdateCarDto){

    let carDB = this.findOneById(id);//recuerda que carDB es un objeto

    //La función map()  es un método de los arrays que se utiliza para transformar o mapear cada elemento de un array 
    //a un nuevo valor, y devuelve un nuevo array con los resultados de esa transformación.
   //     ¿Cómo funciona?
   // Recorre cada elemento del array.
  // Aplica una función de transformación (que defines tú con una func. de flecha) a cada elemento.
  // Devuelve un nuevo array con los elementos ya transformados.
  // No modifica el array original

   if (updateCarDto.id && updateCarDto.id!==id)//esta validacion está de mas
     throw new BadRequestException(`Id de carro invalido en el body, mi pana`)

    this.cars = this.cars.map (car =>{//Aquí, car es el parámetro que representa el elemento actual del array durante cada iteración del bucle que hace map.
    //Ejemplo: Si this.cars tiene 3 objetos (autos), el map llamará a la función de callback 3 veces, cada vez con un car que es uno de esos autos.
        
       if (car.id===id) {//si en uno de los recorridos el id del objeto car coincide con el parámetro que le pasé...
            carDB = {...carDB,...updateCarDto,id}//El operador ... permite copiar todas las propiedades de un objeto
            // dentro de otro. En el caso del método update, esto nos ayuda a combinar el carro original (carDB) con
            // los nuevos valores (updateCarDto) en un solo objeto, sobrescribiendo las propiedades que están en ambos.
            //tipo carDB=updateCarDTO en pocas lineas de codigo
            // El orden importa: En la expresión de desestructuración, si un objeto se incluye después, 
            // su propiedad sobrescribirá a las anteriores si tienen el mismo nombre.
            // Asignación explícita: Al poner id solito explícitamente al final, estás asegurando que el nuevo objeto 
            // tenga el id que deseas, y se ignorará cualquier id que pudiera haber estado en carDB o updateCarDto.

                return carDB;//Esto es clave. Esta línea significa que, si hemos encontrado el carro correcto
                // y lo hemos actualizado, estamos devolviendo el carro actualizado para que map lo incluya 
                //en el nuevo arreglo.
            
        }

        return car;//"Devuelve este carro como está, sin cambios, para que forme parte del nuevo arreglo 
        //que map está construyendo."
        //Este return no finaliza la ejecución del método update, sino que solo finaliza la ejecución 
        //de la iteración actual del callback.
        
    })




       return carDB;//carro "actualizado"
       // Si retornas carDB: Solo obtendrás el carro que fue actualizado.
       //Si retornas this.cars: Obtendrás un array de todos los carros, con el carro que fue actualizado en la lista.
       //La línea this.cars = this.cars.map(car => {...}); reasigna this.cars al nuevo array resultante de map(), 
       //que contiene todos los carros, pero con el carro actualizado en el lugar correspondiente.
       //Esencialmente, this.cars ahora incluye el carro que fue actualizado, pero este proceso no está asignando 
       //carDB directamente a this.cars. En cambio, está utilizando el resultado de map()
  }

  delete(id: string) {
    // Necesito traerme el carro de la BD que voy a eliminar
    const carDB = this.findOneById(id); // findOneById lanzará una excepción si el carro no existe
    
    // Usamos filter para eliminar el carro con el id que pasamos
    this.cars = this.cars.filter(car => car.id !== id); // Eliminamos el carro cuyo id coincide - filter devuelve 
    //un arreglo que excluye el elemento que quiero borrar.
    
    // Retornamos la nueva lista de carros excluyendo al que quisimos eliminar
    //pudieramos no retornar nada y que este metodo se encarge solo de eliminar y ya
    return this.cars;
  }
  
}
