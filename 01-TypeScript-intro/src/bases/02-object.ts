export const pokemonIds = [1,20,30,34,66];

/*
pokemonIds.push('hola'); //añadir elementos en un arreglo existente
pokemonIds.push(+'1'); //añadir elementos en un arreglo existente
console.log(pokemonIds);
*/

//comentar varias lineas: seleccionarlas y hacer Ctrl + K luego hacer Ctrl + C

// const pokemon = {
//     id: 1
//     name='Pikachu'
// }

interface Pokemon {
id: number;
name :string;
//age?:number; //distinto a age: number | undefined.
age:number;

}

export const bulbasaur:Pokemon = {
    id: 1,
    name: 'Bulbasaur'
    //age:undefined
    ,
    age: 0
}

export const charmander: Pokemon = {
    id: 4,
    name: "Charmander",
    age: 0
}

//export const pokemons = [];//arreglo inicializado en vacio - inicializado del tipo never

export const pokemons: Pokemon[] = [];
pokemons.push(charmander, bulbasaur);
console.log(pokemons)



//pokemons.push(1,'string',charmander)
//object Object --> es un objeto - lo que se ve en la pagina es imprimir objeto
