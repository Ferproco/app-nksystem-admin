import { ListaPrecio } from './ListaPrecio.model';

export class Contacto {

   public id: number;
   public codgrupo: number;
   public codvendedor: number = null;
   public codnegocio: number;
   public codtipoidentificacion: number = null;
   public numeroidentificacion: string = '';
   public codigodv: number;
   public nombreprimero: string;
   public nombresegundo: string;
   public apellidoprimero: string;
   public apellidosegundo: string;
   public razonsocial: string;
   public telefonomovil: string;
   public telefonofijo1: string;
   public telefonofijo2: string;
   public telefonofax: string;
   public direccionfiscal: string;
   public direccionexogena: string;
   public correoe: string;
   public codtipocontacto: number = null;
   public codformapago: number = null;
   public codtipocontibuyente: number = null;
   public status: string;
   public regimeniva: string;
   public fecharegistro: Date;
   public tarifa: string;
   public contribuyente: string;
   public codcontable: number;
   public codtipopersona: number = null;
   public codpais: number;
   public coddepartamento: number = null;
   public codmunicipio: number = null;
   public lugarenvio: string;
   public codlistaprecio: number = null;
   public paginaweb: string;
   public limitecreditohasta: number = 0;
   public fechacreditodesde: string;
   public fechacreditohasta: string;
   public observaciones: string;
   public descuentocondicionado: string = 'No';
   public responsableiva: string;
   public declaranterenta: string;
   public autorretenedor: string;
   public responsabilidadfiscal: string = 'No';
   public actividadmercantil: string;
   public tipotributo: string;

   public listaprecio: Array<ListaPrecio> = [];

  /*constructor(
    id: number,
    codgrupo: number,
    codvendedor: number,
    codnegocio: number,
    codtipoidentificacion: number,
    numeroidentificacion: string,
    nombreprimero: string,
    nombresegundo: string,
    apellidoprimero: string,
    apellidosegundo: string,
    razonsocial: string,
    telefonomovil: string,
    telefonofijo1: string,
    telefonofijo2: string,
    telefonofax: string,
    direccionfiscal: string,
    direccionexogena: string,
    correoe: string,
    codtipocontacto: number,
    codformapago: number,
    codtipocontibuyente: number,
    status: string,
    regimeniva: string,
    fecharegistro: Date,
    tarifa: string,
    contribuyente: string,
    codcontable: number,
    codtipopersona: number,
    codpais: number,
    coddepartamento: number,
    codmunicipio: number,
    lugarenvio: string,
    codlistaprecio: number,
    paginaweb: string ,
    limitecreditohasta: number,
    fechacreditodesde: string,
    fechacreditohasta: string,
    observaciones: string,
    descuentocondicionado: string,
    codigodv: number,
    responsableiva: string,
    declaranterenta: string,
    autorretenedor: string,
    responsabilidadfiscal: string,
    actividadmercantil: string,
    tipotributo: string ) {*/
  constructor(json: any = null) {
    if (json !== null) {
      this.id = json.id;
      this.codgrupo = json.codgrupo;
      this.codvendedor = json.codvendedor;
      this.codnegocio = json.codnegocio;
      this.codtipoidentificacion = json.codtipoidentificacion;
      this.numeroidentificacion = json.numeroidentificacion;
      this.nombreprimero = json.nombreprimero;
      this.nombresegundo = json.nombresegundo;
      this.apellidoprimero = json.apellidoprimero;
      this.apellidosegundo = json.apellidosegundo;
      this.razonsocial = json.razonsocial;
      this.telefonomovil = json.telefonomovil;
      this.telefonofijo1 = json.telefonofijo1;
      this.telefonofijo2 = json.telefonofijo2;
      this.telefonofax = json.telefonofax;
      this.direccionfiscal = json.direccionfiscal;
      this.correoe = json.correoe;
      this.codtipocontacto = json.codtipocontacto;
      this.codformapago = json.codformapago;
      this.codtipocontacto = json.codtipocontibuyente;
      this.status = json.status;
      this.regimeniva = json.regimeniva;
      this.fecharegistro = json.fecharegistro;
      this.tarifa = json.tarifa;
      this.contribuyente = json.contribuyente;
      this.codcontable = json.codcontable;
      this.codtipopersona = json.codtipopersona;
      this.codpais = json.codpais;
      this.coddepartamento = json.coddepartamento;
      this.codmunicipio = json.codmunicipio;
      this.direccionexogena = json.direccionexogena;
      this.lugarenvio = json.lugarenvio;
      this.codlistaprecio = json.codlistaprecio;
      this.paginaweb = json.paginaweb;
      this.limitecreditohasta = json.limitecreditohasta;
      this.fechacreditodesde = json.fechacreditodesde;
      this.fechacreditohasta = json.fechacreditohasta;
      this.observaciones = json.observaciones;
      this.descuentocondicionado = json.descuentocondicionado;
      this.codigodv = json.codigodv;
      this.responsableiva = json.responsableiva;
      this.declaranterenta = json.declaranterenta;
      this.autorretenedor = json.autorretenedor;
      this.responsabilidadfiscal = json.responsabilidadfiscal;
      this.actividadmercantil = json.actividadmercantil;
      this.tipotributo = json.tipotributo;
    }

  }

}
