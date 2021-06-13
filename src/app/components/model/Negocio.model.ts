export class Negocio{
    	
    public idnegocio:number;
    public codnegocio:string;
	public nombre:string;
	public direccion:string;
	public telefono:string;
    public email:string;
    public telefonomovil:string;
	public web:string;
	public imagen:string;
	public mascaracontable:string;
    public contribuyente:string;
    public habilitado:boolean;
    public cantidadusuario: number;
    public tiempocierresesion: number;
    public dominio: string;
    public ip: string;
    public puerto: number;
    public creadoel: Date;
	public actualizadoel: Date;

    constructor(idnegocio:number,codnegocio:string,nombre:string,direccion:string,telefono:string,
                email:string,telefonomovil:string,web:string,imagen:string,mascaracontable:string,
                contribuyente:string,habilitado:boolean, creadoelin: Date, actualizadoelin: Date){

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
     this.creadoel = creadoelin;
     this.actualizadoel = actualizadoelin;
    }
}