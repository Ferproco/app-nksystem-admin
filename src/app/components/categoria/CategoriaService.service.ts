import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';

import { Categoria } from '../model/Categoria.model';



@Injectable()
export class CategoriaService{

  lstCategorias: Categoria[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarCategorias(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/familia';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
 

}
