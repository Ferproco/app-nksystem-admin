export class Contacto {

   id: number;
   codgrupo: number;
   codvendedor: number;
   codnegocio: number;
   codtipoidentificacion: number;
   numeroidentificacion: string;
   nombreprimero:string;   
   nombresegundo:string;
   apellidoprimero:string;
   apellidosegundo:string;
   razonsocial: string;
   telefonomovil: string;
   telefonofijo1: string;
   telefonofijo2: string;
   telefonofax: string;
   direccionfiscal: string;
   direccionexogena:string;
   correoe: string;
   codtipocontacto: number;
   codformapago: number;
   codtipocontibuyente: number;
   status: string;
   regimeniva: string;
   fecharegistro: Date;
   tarifa: string;
   contribuyente: string;
   codcontable: number;
   codtipopersona:number;
   codpais:number;
   coddepartamento:number;
   codmunicipio:number;
   lugarenvio:string;
   cupo:string;
   codlistaprecio:number;

  constructor(id: number, codgrupo: number, codvendedor: number, codnegocio: number, codtipoidentificacion: number,
    numeroidentificacion: string, nombreprimero:string, nombresegundo:string, apellidoprimero:string,
    apellidosegundo:string, razonsocial: string, telefonomovil: string, telefonofijo1: string, telefonofijo2: string,
    telefonofax: string, direccionfiscal: string,direccionexogena:string, correoe: string, codtipocontacto: number, codformapago: number,
    codtipocontibuyente: number, status: string, regimeniva: string, fecharegistro: Date, tarifa: string, contribuyente: string,
    codcontable: number,codtipopersona:number,codpais:number,coddepartamento:number,codmunicipio:number,lugarenvio:string,cupo:string,codlistaprecio:number) {

    this.id = id;
    this.codgrupo = codgrupo;
    this.codvendedor = codvendedor;
    this.codnegocio = codnegocio;
    this.codtipoidentificacion = codtipoidentificacion;
    this.numeroidentificacion = numeroidentificacion;
    this.nombreprimero=nombreprimero;   
    this.nombresegundo=nombresegundo;
    this.apellidoprimero=apellidoprimero;
    this.apellidosegundo=apellidosegundo;
    this.razonsocial = razonsocial;
    this.telefonomovil = telefonomovil;
    this.telefonofijo1 = telefonofijo1;
    this.telefonofijo2 = telefonofijo2;
    this.telefonofax = telefonofax;
    this.direccionfiscal = direccionfiscal;
    this.correoe = correoe;
    this.codtipocontacto = codtipocontacto;
    this.codformapago = codformapago;
    this.codtipocontacto = codtipocontibuyente;
    this.status = status;
    this.regimeniva = regimeniva;
    this.fecharegistro = fecharegistro;
    this.tarifa = tarifa;
    this.contribuyente = contribuyente;
    this.codcontable = codcontable;
    this.codtipopersona=codtipopersona;
    this.codpais=codpais;
    this.coddepartamento=coddepartamento;
    this.codmunicipio=codmunicipio;
    this.direccionexogena=direccionexogena;
    this.lugarenvio=lugarenvio;
    this.cupo=cupo;
    this.codlistaprecio=codlistaprecio;

  }

}
