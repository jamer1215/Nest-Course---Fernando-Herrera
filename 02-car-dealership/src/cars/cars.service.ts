//S38: clase comun y corriente con la peculiaridad de que se puede inyectar
//todo servicio es un provider, mas no viceversa necesariamente

import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';

//decorador - dice que clase es inyectable
@Injectable()
export class CarsService {
    private cars = [//array de "listas"
        {
            id: 1,
            brand: 'Toyota',
            model: 'Corolla',
        },
        {
            id: 2,
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: 3,
            brand: 'Jeep',
            model: 'Cherokee',
        },
    ];

    findAll(){
        return this.cars;
    }


    findOneById(id: number) {
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
}
