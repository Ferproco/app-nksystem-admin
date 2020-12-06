import { Categoria } from './Categoria.model';

export class Articulo {
  public id: number;
  public codigo: string;
  public nomarticulo: string;
  public codmarca: number;
  public codfamilia: number;
  public codunidadmedida: number;
  public codimpuesto: number;
  public preciosugerido: number;
  public codigobarraprincipal: string;
  public referencia: string;
  public serial: string;
  public status: string;
  public descripcionlarga: string;
  public stockminimo: number;
  public stockmaximo: number;
  public puntoreorden: number;
  public codnegocio: string;
  public familia: Categoria;
  public tipoproducto:number;

  constructor(json: any = null)
  {
  if(json !== null) {
  
    this.id =json.id;
    this.codigo =json.codigo;
    this.nomarticulo = json.nomarticulo;
    this.codmarca = json.codmarca;
    this.codfamilia = json.codfamilia;
    this.codunidadmedida = json.codunidadmedida;
    this.codimpuesto = json.codimpuesto;
    this.preciosugerido = json.preciosugerido;
    this.codigobarraprincipal = json.codigobarraprincipal;
    this.referencia = json.referencia;
    this.serial = json.serial;
    this.status = json.status;
    this.codmarca = json.codmarca;
    this.codfamilia = json.codfamilia;
    this.codigobarraprincipal = json.codigobarraprincipal;
    this.descripcionlarga = json.descripcionlarga;
    this.serial = json.serial;
    this.familia = json.familia;
    this.tipoproducto=json.tipoproducto;

  }
}
}
