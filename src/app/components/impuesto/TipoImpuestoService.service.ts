import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';

import { Impuesto } from '../model/Impuesto.model';
import { TipoImpuesto } from '../model/TipoImpuesto.model';



@Injectable()
export class TipoImpuestoService{

  lstTipoImpuestos: TipoImpuesto[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarTipoImpuestos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipoimpuesto';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
 

}
