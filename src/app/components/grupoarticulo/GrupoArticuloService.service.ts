import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';

import { GrupoArticulo } from '../model/GrupoArticulo.model';



@Injectable()
export class GrupoArticuloService{

  lstGrupoArticulos: GrupoArticulo[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarGrupoArticulos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/grupoarticulo';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
 

}
