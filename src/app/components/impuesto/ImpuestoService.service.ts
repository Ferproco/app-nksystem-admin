import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';

import { Impuesto } from '../model/Impuesto.model';



@Injectable()
export class ImpuestoService{

  lstImpuestos: Impuesto[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarImpuestos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/impuesto';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
 

}
