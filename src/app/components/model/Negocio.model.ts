export class Negocio{
    	
    idnegocio:number;
    codnegocio:string;
	nombre:string;
	direccion:string;
	telefono:string;
    email:string;
    telefonomovil:string;
	web:string;
	imagen:string;
	mascaracontable:string;
    contribuyente:string;
    habilitado:boolean;
    cantidadusuario: number;
    tiempocierresesion: number;
    dominio: string;
    ip: string;
    puerto: number;

    constructor(idnegocio:number,codnegocio:string,nombre:string,direccion:string,telefono:string,
                email:string,telefonomovil:string,web:string,imagen:string,mascaracontable:string,
                contribuyente:string,habilitado:boolean){

     this.idnegocio=idnegocio;
     this.codnegocio=codnegocio;
     this.nombre=nombre;
     this.direccion=direccion;
     this.telefono=telefono;
     this.email=email;
     this.telefonomovil=telefonomovil;
     this.web=web;
     this.imagen=imagen;
     this.mascaracontable=mascaracontable;
     this.contribuyente=contribuyente;
     this.habilitado=habilitado;

    }
}