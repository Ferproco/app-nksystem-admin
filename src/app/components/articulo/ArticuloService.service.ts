import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';

import { Articulo } from '../model/Articulo.model';



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

  guardarArticulo(id: number, idnegocio: number, articulo: Articulo){
    console.log('el articulo enviado es ' + JSON.stringify(articulo));
    const body = {
      
      codnegocio: Number(idnegocio),
      codigo: articulo.codigo,
      nomarticulo:articulo.nomarticulo,
      
      codfamilia:articulo.codfamilia,
      codunidadmedida: articulo.codunidadmedida,
      codimpuesto:articulo.codimpuesto,
      preciosugerido:articulo.preciosugerido,
      referencia:articulo.referencia,
      codigobarraprincipal:articulo.codigobarraprincipal,
      serial:articulo.serial,
      descripcionlarga:articulo.descripcionlarga,
      status: articulo.status === '1' ? 'ACTIVO' : 'INACTIVO'

    };
    console.log('id ' + id + 'contacto ' + JSON.stringify(body));
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
