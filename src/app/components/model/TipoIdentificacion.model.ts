export class TipoIdentificacion {
    id: number;
    codigo: string;
    nombre: string;


    constructor( id: number, codigo: string,nombre: string) {

        this.id=id;
        this.codigo=codigo;
        this.nombre=nombre;
    }
}