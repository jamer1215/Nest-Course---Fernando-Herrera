const Deprecated = (deprecationReason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
      // console.log({target})
      return {
        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${ memberName } is deprecated with reason: ${ deprecationReason }`);
            //! Llamar la función propiamente con sus argumentos
            propertyDescriptor.value.apply(this, args); 
          }
          return wrapperFn;
        }
      }
    }   
}

export class Pokemon {

    constructor(
        public readonly id: number, 
        public name: string,
    ) {}

    scream() {
        console.log(`${ this.name.toUpperCase() }!!!`);
    }

    @Deprecated('Most use speak2 method instead')//decorador que se pone sobre un metodo obsoleto - que no debe usarse más y al ver el cambio en el navegador web en consola me saldrá un pequeño warning amarillo que dice que el metodo está obsoleto
    speak() {
        console.log(`${ this.name }, ${ this.name }`);
    }

    speak2() {
        console.log(`${ this.name }, ${ this.name } SPEAK2`);
    }


}


export const charmander = new Pokemon(4,'Charmander');

//charmander.speak();//metodo obsoleto
charmander.speak2();