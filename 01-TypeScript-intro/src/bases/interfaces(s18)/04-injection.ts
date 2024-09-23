//lo que se hizo en s18 - archivo 03 algo limpio

//import axios from 'axios';
import { Move, PokeapiResponse } from '../interfaces(s18)/pokeapi-response.interface';
import { HttpAdapter, PokeApiAdapter, PokeApiFetchAdapter } from '../api(s19)/pokeApi.adapter';

export class Pokemon {

    get imageUrl(): string {
        return `https://pokemon.com/${ this.id }.jpg`;
    }
  
    constructor(
        public readonly id: number, 
        public name: string,
        // Todo: inyectar dependencias
        private readonly http: HttpAdapter,//clase pokemon usa la interfaz HttpAdapter - dicha interface es implementada por otras clases

    ) {}

    scream() {
        console.log(`${ this.name.toUpperCase() }!!!`);
    }

    speak() {
        console.log(`${ this.name }, ${ this.name }`);
    }

    async getMoves(): Promise<Move[]> {
        // const { data } = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
        const data = await this.http.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4')//inyeccion de dependencias
        console.log( data.moves );
        
        return data.moves;
    }

}

const pokeApiAxios = new PokeApiAdapter();
//const pokeApiFetch = new PokeApiFetchAdapter();
export const charmander = new Pokemon( 4, 'Charmander',pokeApiAxios );//pokeaxios o pokefetch sin peo

charmander.getMoves();