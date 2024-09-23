import axios from 'axios';//para el metodo asíncrono getMoves - paquete que permite hacer peticiones HTTP a una API (un GET en este caso)
import { Move, PokeapiResponse } from './interfaces(s18)/pokeapi-response.interface';

// export class Pokemon {

//   public readonly id:number;//readonly: solo de lectura cuando se crea la instancia pero jamas se puede modificar
//   public name: string;  

//   constructor(id:number,name:string){//any: puede ser un tipo de dato=cualquier cosa
//     this.id=id;
//     this.name=name;
//   }
// }


//otra forma de definir una clase que es mucho más comoda
export class Pokemon {
    constructor(public readonly id :number,
        public name:string,
        //public imageURL: string,
    ){}

    get imageUrl(): string{
        return `https://pokemon.com/${this.id}.jpg`
    }

    public scream (){//definicion de un metodo - creo que es del tipo void - el public es redundante
        //console.log('AAAAAAAAA')
        console.log(`${this.name.toUpperCase()}!!!`);
        this.speak();//invoco el metodo dentro de la clase
    }

    private speak(){//metodo que solo dentro de la clase se usa y no en las instancias de la misma
        console.log(`${this.name}, ${this.name}`);
    }

    //Métodos asíncronos: promesas - tipo la vida real parecido
    //yarn add axios - ayuda en peticiones HTTP (ejecutarlo en la terminal)

    /*
    async getMoves(){// Promise<T> - lo explica accediendo a una API de Pokemon:  https://pokeapi.co/

        const moves = 10;
        return moves;

    }

  }
    */

  //acá estamos violando un principio SOLID - en el avance del curso se irá viendo
  async getMoves():Promise<Move[]>{//forzando que sea un metodo asincrono que retorna una promesa con un arreglo de movimientos (Move-->Interface)
    //const resp = await axios.get('https://pokeapi.co/api/v2/pokemon/4')//await te dice espera a que la peticion http te de una respuesta - espera a que esta promesa se resuelva y eso lo asignas a la constante resp si no pusiera el await entonces me saldria pendiente porque cuando hago resp=axios.get me asigna estáticamente el estado de esa petición. Es tipo espérate a que cumpla la vaina y cuando lo haga asigna la respuesta y muestrala
    //console.log(resp);
    //console.log(resp.data) //traeme solo la parte de la data
    //console.log(resp.data.moves)//traeme de la data los movimientos (moves) del pokemon
    //ponte que de la resp solo quiero que me traigas la parte de la data - desestructurar la data:
    //const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon/4')//dentro de los corchetes presiona Ctrl + space para ver que items puedo desestructurar
    const {data} = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4')//en Pokeapi me habia salido un error de que tenia que importar la interfaz, haz Ctrl + . para que aparezca el menusito
    console.log(data.moves[0].move)

    return data.moves;
  }
}
export const charmanderito = new Pokemon (4,'Charmander');
//charmanderito.id=10; //da error
//charmanderito.name='Nombresito'// no daría error porque es de lectura y escritura

// console.log(charmanderito);
// console.log(charmanderito.imageUrl);
// //charmanderito.speak();//da error si es private
// charmanderito.scream();

charmanderito.getMoves();//no pudiera hacer .getMoves + 10 por ejemplo en el console log
