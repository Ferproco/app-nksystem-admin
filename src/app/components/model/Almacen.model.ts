export class Almacen{
    codalmacen: string;
	codnegocio: string;
    nombre: String;
	principal: Boolean;
    tipoalmacen: string;
    direccion: string;
    idalmacen: number;

    constructor( codalmacen: string,codnegocio: string,nombre: string, principal: Boolean,tipoalmacen: string, direccion: string,idalmacen: number){


        this.codalmacen=codalmacen;
        this.codnegocio=codnegocio;
        this.nombre=nombre;
        this.principal=principal;
        this.tipoalmacen=tipoalmacen;
        this.direccion=direccion;
        this.idalmacen=idalmacen;
    }
}