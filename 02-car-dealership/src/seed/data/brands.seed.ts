//esta carpeta la creamos en s62 para simular la data a precargar de una presunta BD

import { Brand } from 'src/brands/entities/brand.entity'
import {v4 as uuid} from 'uuid'
//aunque no sea parte del modulo particular - aprovechemos que no tiene ninguna dependencia por eso puedo agarrarla de
//otro modulo

export const BRANDS_SEED: Brand[] = [

    {
        id: uuid(),
        name: "Volvo",
        createdAt: new Date().getTime()
    },

    {
        id: uuid(),
        name: "Toyota",
        createdAt: new Date().getTime()
    },

    {
        id: uuid(),
        name: "Honda",
        createdAt: new Date().getTime()
    },

    {
        id: uuid(),
        name: "Tesla",
        createdAt: new Date().getTime()
    },
    



]