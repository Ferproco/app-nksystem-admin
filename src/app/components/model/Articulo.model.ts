import { Categoria } from './Categoria.model';
import { Kardex } from './Kardex.model';
import { UnidadMedidaAlterna } from './UnidadMedidaAlterna.model';

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
 
  public codnegocio: string;
  public familia: Categoria;
  public tipoproducto:number;
  public descripcionlarga: string;
  public stockminimo: number;
  public stockmaximo: number;
  public puntoreorden: number;
 
	public clasificacioniva:string;
	public esimpoconsumo:string;
	public valorimpoconsumo:number;
	public porcentajeimpoconsumo:number;
	public peso:number;
	public talla:number;
	public color:number;
	public ancho:number;
	public alto:number;
	public profundidad:number;
	public facturarsinexistencia:number;
	public ivaincluido:number;
	public aplicaimpuestoconsumo:number;
  public fechacreacion:Date;
  public listakardex: Array<Kardex> = [];
  public listaunidadesalternas: Array<UnidadMedidaAlterna> = [];

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
    
    this.stockminimo = json.stockminimo;
    this.stockmaximo = json.stockmaximo;
    this.puntoreorden = json.puntoreorden;   
    this.clasificacioniva = json.clasificacioniva;
    this.esimpoconsumo = json.esimpoconsumo;
    this.valorimpoconsumo = json.valorimpoconsumo;
    this.porcentajeimpoconsumo = json.porcentajeimpoconsumo;
    this.peso = json.peso;
    this.talla = json.talla;
    this.color = json.color;
    this.ancho = json.ancho;
    this.alto = json.alto;
    this.profundidad = json.profundidad;
    this.facturarsinexistencia = json.facturarsinexistencia;
    this.ivaincluido = json.ivaincluido;
    this.aplicaimpuestoconsumo =json.aplicaimpuestoconsumo;
    this.fechacreacion = json.fechacreacion;
    this.listakardex = json.listakardex;
    this.listaunidadesalternas = json.listaunidadesalternas;


  }
 }
}
