import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { Articulo } from '../model/Articulo.model';



@Injectable()
export class ArticuloService{

  lstArticulos: Articulo[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){ }

  listarArticulos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarArticlo(id: number, idnegocio: number, articulo: Articulo){
    console.log('el articulo enviado es ' + JSON.stringify(articulo));
    const body = {
      
      codnegocio: Number(idnegocio),
      codigo: articulo.codigo,
      nombre:articulo.nomarticulo,
     
      
      status: articulo.status === '1' ? 'ACTIVO' : 'INACTIVO'

    };
    console.log('id ' + id + 'contacto ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }
}
