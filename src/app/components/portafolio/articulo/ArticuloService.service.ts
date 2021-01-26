import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { Articulo } from '../../model/Articulo.model';



@Injectable()
export class ArticuloService{

  lstArticulos: Articulo[] = [];
  uriapi: string = Api.url;
  value: any;

  Eliminar = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient){ }

  listarArticulos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
  listarArticulosPorTipo(codnegocio: string, tipo: string){
    let tipoitems = 0;
    if (tipo === 'P'){
      tipoitems = 1;
    }
    else if (tipo === 'S'){
      tipoitems = 2;
    }
    else if (tipo === 'M'){
      tipoitems = 3;
    }
    else if (tipo === 'G'){
      tipoitems = 4;
    }
    else if (tipo === 'T'){
      tipoitems = 5;
    }
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo/tipo/' + tipoitems;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
  guardarArticulo(idIn: number, idnegocio: number, articulo: Articulo){
    console.log('el articulo enviado es ' + JSON.stringify(articulo));
    console.log('el documento enviado es ' + JSON.stringify(articulo.lstmovimientoskardex));
    
    articulo.lstmovimientoskardex.forEach(element => {
      const fechastr = element.fecha.toString().split('-');
    console.log('la fecha '+ fechastr);
    const year = Number(fechastr[2]);
    const month = Number(fechastr[1]) - 1;
    const date = Number(fechastr[0]);
      console.log('Entro al for de articulos '+ JSON.stringify(element));
      element.id = 0;
      element.codarticulo = Number(idIn);
      element.tipo = 'ENT';
      element.fecha = new Date(year, month, date);
      element.cantidad = element.cantidad;
      element.codunidadmedida = Number(element.codunidadmedida);
      element.codalmacen = Number(element.codalmacen);
      element.concepto = 'ENTRADA POR INVENTARIO';
      element.origen = 'INVENTARIO';
    });
    const body = {
      id: Number(idIn),
      codnegocio: Number(idnegocio),
      codigo: articulo.codigo,
      nomarticulo: articulo.nomarticulo,
      codmarca: Number(articulo.codmarca),
      codfamilia: Number(articulo.codfamilia),
      codunidadmedida: Number(articulo.codunidadmedida),
      codimpuesto: Number(articulo.codimpuesto),
      preciosugerido: Number(articulo.preciosugerido),
      referencia: articulo.referencia,
      codigobarraprincipal:articulo.codigobarraprincipal,
      serial:articulo.serial,
      descripcionlarga:articulo.descripcionlarga,
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
      valorimpoconsumo:Number(articulo.valorimpoconsumo),
      porcentajeimpoconsumo:Number(articulo.porcentajeimpoconsumo),
      lstmovimientoskardex: articulo.lstmovimientoskardex
    };
    console.log('id ' + idIn + 'articulo ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }
  eliminarArticulo(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }


  mostrarArticulo(id: number){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
