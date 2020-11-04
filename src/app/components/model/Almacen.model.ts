export class Almacen{
    codalmacen: string;
	codnegocio: string;
    nombre: string;
	principal: string;
    tipoalmacen: string;
    direccion: string;
    idalmacen: number;
    status:string;

    constructor( codalmacen: string,codnegocio: string,nombre: string, principal: string,tipoalmacen: string, direccion: string,idalmacen: number,status:string){


        this.codalmacen=codalmacen;
        this.codnegocio=codnegocio;
        this.nombre=nombre;
        this.principal=principal;
        this.tipoalmacen=tipoalmacen;
        this.direccion=direccion;
        this.idalmacen=idalmacen;
        this.status=status;
    }
}