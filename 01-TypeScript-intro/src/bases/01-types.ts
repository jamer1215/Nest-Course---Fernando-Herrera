//hay que empezar exportando algo
//no me salió el error que a Fernando.
export let name: string  = 'Jamal';
export const age: number =21;
export const isValid: boolean= true;

//name=123;
//name=true;
name= "Moha";

export const templateString = `String multilinea
que puede tener
" dobles
' simples
inyectar valores
${name}
numeros ${ age}
calculos ${6/3}
booleanos:${isValid}`

console.log(templateString);

