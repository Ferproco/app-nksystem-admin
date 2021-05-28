import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Articulo } from '../../model/Articulo.model';



@Injectable()
export class ArticuloService {

  lstArticulos: Articulo[] = [];
  uriapi: string = environment.UrlTransactional;
  value: any;

  Eliminar = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient) { }

  listarArticulos(codnegocio: string) {
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo';
    return this.httpClient.get(endpoint, { headers: httpHeaders });
  }

  listarArticulosPorTipo(codnegocio: string, tipo: string) {
    let tipoitems = 0;
    if (tipo === 'P') {
      tipoitems = 1;
    }
    else if (tipo === 'S') {
      tipoitems = 2;
    }
    else if (tipo === 'M') {
      tipoitems = 3;
    }
    else if (tipo === 'G') {
      tipoitems = 4;
    }
    else if (tipo === 'T') {
      tipoitems = 5;
    }
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo/tipo/' + tipoitems;
    return this.httpClient.get(endpoint, { headers: httpHeaders });
  }

  listarArticulosPorFilter(codnegocio: string, tipo: string, fechadesde: string, fechahasta: string, kardexcriterio: any) {

    let tipoitems = 0;
    if (tipo === 'P') {
      tipoitems = 1;
    }
    else if (tipo === 'S') {
      tipoitems = 2;
    }
    else if (tipo === 'M') {
      tipoitems = 3;
    }
    else if (tipo === 'G') {
      tipoitems = 4;
    }
    else if (tipo === 'T') {
      tipoitems = 5;
    }

    const fechadesdestr = fechadesde.toString().split('-');
    const fechahastastr = fechahasta.toString().split('-');
    let fechad = null;
    let fechah = null;
    fechad = new Date(Number(fechadesdestr[2]), Number(fechadesdestr[1]) - 1, Number(fechadesdestr[0]));
    fechah = new Date(Number(fechahastastr[2]), Number(fechahastastr[1]) - 1, Number(fechahastastr[0]));
    const body = {
      tipo: Number(tipoitems),
      fechadesde: fechad,
      fechahasta: fechah,
      codalmacen: Number(kardexcriterio.codalmacen),
      articulo_id:  Number(kardexcriterio.idarticulo)
    }
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/transacciones/articulos/';
    return this.httpClient.post(endpoint, JSON.stringify(body), { headers: httpHeaders });
  }


  guardarArticulo(idIn: number, idnegocio: number, articulo: Articulo) {

    articulo.lstmovimientoskardex.forEach(element => {
      const fechastr = element.fecha.toString().split('-');
      const year = Number(fechastr[2]);
      const month = Number(fechastr[1]) - 1;
      const date = Number(fechastr[0]);
      element.id = element.id;
      element.articulo_id = Number(element.articulo_id);
      element.tipo = 'ENT';
      element.fecha = new Date(year, month, date);
      element.cantidad = Number(element.cantidad);
      element.codunidadmedida = Number(element.codunidadmedida);
      element.codalmacen = Number(element.codalmacen);
      element.montoxunidad = Number(element.montoxunidad);
      element.montototal = Number(element.cantidad) * Number(element.montoxunidad);
      element.concepto = 'ENTRADA POR INVENTARIO';
      element.origen = 'INVENTARIO';
    });

    articulo.lstunidadesalternas.forEach(element => {
      //console.log('Entro al for de unidades alternas ' + JSON.stringify(element));
      element.id = element.id;
      element.articulo_id = Number(element.articulo_id);
      element.codunidadmedidaalterna = Number(element.codunidadmedidaalterna);
      //element.fecha = new Date(year, month, date);
      element.valorconversion = Number(element.valorconversion);
      element.codunidadminima = Number(element.codunidadminima);
      //element.montototal= Number(element.cantidad) * Number(element.montoxunidad);
      element.codnegocio = element.codnegocio;
    });
    console.log('La marca ' + articulo.codmarca);
    let marca = null;
    if (Number(articulo.codtipoproducto) === 1){
      if (articulo.codmarca === null || articulo.codmarca === 0){
        marca = null;
      }
      else{
        marca = Number(articulo.codmarca);
      }
    }else{
      marca = null;
    }
    const body = {
      id: Number(idIn),
      codnegocio: Number(idnegocio),
      codigo: articulo.codigo,
      nomarticulo: articulo.nomarticulo,
      codmarca: marca,
      codfamilia: Number(articulo.codfamilia),
      codunidadmedida: articulo.codunidadmedida === 0 ? null : Number(articulo.codunidadmedida),
      codimpuesto: articulo.codimpuesto === 0 ? null : Number(articulo.codimpuesto),
      preciosugerido: Number(articulo.preciosugerido),
      referencia: articulo.referencia,
      codigobarraprincipal: articulo.codigobarraprincipal,
      serial: articulo.serial,
      descripcionlarga: articulo.descripcionlarga,
      status: Number(articulo.status) === 1 ? 'ACTIVO' : 'INACTIVO',
      stockminimo: Number(articulo.stockminimo),
      stockmaximo: Number(articulo.stockmaximo),
      cantidadreorden: Number(articulo.cantidadreorden),
      peso: Number(articulo.peso),
      talla: Number(articulo.talla),
      color: articulo.color,
      codtipoproducto: Number(articulo.codtipoproducto),
      tipoiva: articulo.tipoiva,
      ivaincluido: articulo.ivaincluido,
      esimpoconsumo: articulo.esimpoconsumo,
      valorimpoconsumo: Number(articulo.valorimpoconsumo),
      porcentajeimpoconsumo: Number(articulo.porcentajeimpoconsumo),
      lstmovimientoskardex: articulo.lstmovimientoskardex,
      lstunidadesalternas: articulo.lstunidadesalternas
    };
    console.log('id ' + idIn + ' articulo ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo';
    return this.httpClient.post(endpoint, JSON.stringify(body), { headers: httpHeaders });
  }
  eliminarArticulo(id: number) {
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo/' + id;
    return this.httpClient.delete(endpoint, { headers: httpHeaders });
  }


  mostrarArticulo(id: number) {

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo/' + id;
    return this.httpClient.get(endpoint, { headers: httpHeaders });
  }
}
