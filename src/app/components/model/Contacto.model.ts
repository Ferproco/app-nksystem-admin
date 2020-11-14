export class Contacto{
    private id:number;
	private codgrupo:number;    
    private codvendedor:number;   
    private codnegocio:number;   
    private codtipoidentificacion:number; 
    private numeroidentificacion:string;
    private nombre:string;    
    private razonsocial:string;
    private telefonomovil:string;
    private telefonofijo1:string;
    private telefonofijo2:string;
    private telefonofax:string;
    private direccionfiscal:string;
    private correoe:string;
    private codtipocontacto:number;
    private codformapago:number;
    private codtipocontibuyente:number;
    private status:string;    
    private regimeniva:string;
    private fecharegistro:Date;
    private tarifa:string;   
    private contribuyente:string;
    private codcontable:number;

    constructor(id:number, codgrupo:number,codvendedor:number,codnegocio:number, codtipoidentificacion:number, 
        numeroidentificacion:string, nombre:string, razonsocial:string,telefonomovil:string, telefonofijo1:string,telefonofijo2:string,
        telefonofax:string,direccionfiscal:string,correoe:string, codtipocontacto:number, codformapago:number,
        codtipocontibuyente:number,status:string,regimeniva:string,fecharegistro:Date,tarifa:string,contribuyente:string,
        codcontable:number){

         this.id=id;
         this.codgrupo=codgrupo;
         this.codvendedor=codvendedor;
         this.codnegocio=codnegocio;
         this.codtipoidentificacion= codtipoidentificacion;
         this.numeroidentificacion=numeroidentificacion;
         this.nombre=nombre;
         this.razonsocial= razonsocial;
         this.telefonomovil=telefonomovil;
         this.telefonofijo1= telefonofijo1;
         this.telefonofijo2=telefonofijo2;
        this.telefonofax= telefonofax;
        this.direccionfiscal=direccionfiscal;
        this.correoe=correoe;
        this.codtipocontacto= codtipocontacto;
        this.codformapago= codformapago;
        this.codtipocontacto=codtipocontibuyente;
        this.status=status;
        this.regimeniva=regimeniva;
        this.fecharegistro=fecharegistro;
        this.tarifa=tarifa;
        this.contribuyente=contribuyente;
        this.codcontable=codcontable;  

        }
}