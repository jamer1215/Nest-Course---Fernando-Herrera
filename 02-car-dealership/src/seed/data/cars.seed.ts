//esta carpeta la creamos en s62 para simular la data a precargar de una presunta BD

import {v4 as uuid} from 'uuid'
import { Car } from "src/cars/interfaces/car.interfaces"//YO puedo importar elementos de otro modulo de la app global
//aunque no sea parte del modulo particular - aprovechemos que no tiene ninguna dependencia por eso puedo agarrarla de
//otro modulo

export const CARS_SEED: Car[] = [

    {
        id: uuid(),
        brand: "Toyota",
        model: "Corolla",
    },

    {
        id: uuid(),
        brand: "Honda",
        model: "Civic",
    },

    {
        id: uuid(),
        brand: "Jeep",
        model: "Cherokee",
    }
    



]