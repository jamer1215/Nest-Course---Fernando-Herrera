//definicion necesaria para una clase adaptadora (en este caso una clase del tipo HttpAdapter)
//debe implementar para yo usarla en otro servicio sin peo

export interface HttpAdapter{
    get<T>(url:string):Promise<T>

}