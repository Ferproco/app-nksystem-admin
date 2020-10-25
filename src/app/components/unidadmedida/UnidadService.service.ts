import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Cliente } from '../model/Cliente.model';


@Injectable()
export class UnidadService{

  lstUnidades: Cliente[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarUnidades(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/unidadmedida';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
 

}