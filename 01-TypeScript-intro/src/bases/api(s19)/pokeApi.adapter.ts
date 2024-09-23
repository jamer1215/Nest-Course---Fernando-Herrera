//clase adaptadora: servirme como puente entre la clase o paquete de terceros con mi codigo principal
//adapto una funncionalidad de terceros a mi codigo
//evito hacer tantos cambios en la c - solo cambio la clase de acá y lo demas funciona fino

import axios from "axios";

export interface HttpAdapter{
    get<T>(url: string): Promise<T>

}

export class PokeApiFetchAdapter implements HttpAdapter{
    async get<T>(url: string): Promise<T>{
        //peticion get
        const resp = await fetch(url);//busco quitar esto de 04
        const data: T = await resp.json();
        console.log('Con fetch')

        return data;
    }
}

export class PokeApiAdapter implements HttpAdapter{

    private readonly axios = axios;

    async get<T>(url: string): Promise<T>{
        //peticion get
        const { data } = await this.axios.get<T>(url);//busco quitar esto de 04
        console.log('Con axios')

        return data;
    }

    /*
    async post(url: string, data: any){

    }

    async patch(url: string, data: any){
        
    }

    async delete(url: string){
        
    }
    */
}