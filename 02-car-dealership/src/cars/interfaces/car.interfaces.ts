//seccion 3 - sesión 45
//creemos una serie de interfaces 

export interface Car {
    id: string;//para que sean UUID tipo lo que se hace en mongoDB...
    brand: string;
    model: string

}

//...importemos el paquete en la terminal mediante yarn add uuid