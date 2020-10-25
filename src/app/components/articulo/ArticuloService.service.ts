import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Articulo } from '../model/Articulo.model';



@Injectable()
export class ArticuloService{

  lstArticulos: Articulo[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarArticulos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
 

}
