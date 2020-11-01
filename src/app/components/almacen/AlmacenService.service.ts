import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Almacen } from '../model/Almacen.model';
import { Cliente } from '../model/Cliente.model';


@Injectable()
export class AlmacenService{

  lstAlmacenes: Almacen[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarAlmacenes(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/almacen';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
 

}
