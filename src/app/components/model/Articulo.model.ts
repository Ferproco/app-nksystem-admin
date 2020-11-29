import { Categoria } from './Categoria.model';

export class Articulo {
    id:number;
    codigo: string;
    nomarticulo: string;
    codmarca: number;
    codfamilia: number;
    codunidadmedida:number;
    codimpuesto:number;
    preciosugerido: number;
    codigobarraprincipal: string;
    referencia:string;
    serial: string;
    status: string;
    descripcionlarga:string;   
    stockminimo: number;
    stockmaximo: number;
    puntoreorden: number;   
    codnegocio: string;
    familia:Categoria;
  
    
    constructor(
      id:number,
      codigo: string,
      nomarticulo: string,
      codmarca: number,
      codfamilia: number,
      codunidadmedida:number,
      codimpuesto:number,
      preciosugerido: number,
      codigobarraprincipal: string,
      referencia:string,
      serial: string,
      status: string,
      descripcionlarga: string,     
      codnegocio: number,
      familia:Categoria
      
      ) {

        this.id=id;
        this.codigo=codigo;
        this.nomarticulo=nomarticulo;
        this.codmarca= codmarca;
        this.codfamilia= codfamilia;
        this.codunidadmedida=codunidadmedida;
        this.codimpuesto=codimpuesto;
        this.preciosugerido=preciosugerido;
        this.codigobarraprincipal= codigobarraprincipal;
        this.referencia=referencia;
        this.serial=serial;
        this.status=status;
        this.codmarca= codmarca;
        this.codfamilia=codfamilia;       
        this.codigobarraprincipal=codigobarraprincipal;
        this.descripcionlarga=descripcionlarga;        
        this.serial=serial;
        this.familia=familia;
       
    }
}
