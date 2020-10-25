import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Cliente } from '../model/Cliente.model';
import { FormaPago } from '../model/FormaPago.model';


@Injectable()
export class FormaPagoService{

  lstFormaPagos: FormaPago[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarFormaPagos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/formapago';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }


}
