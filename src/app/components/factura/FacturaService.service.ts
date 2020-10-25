import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Factura } from '../model/Factura.model';


@Injectable()
export class FacturaService{

  lstFacturas: Factura[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarFacturas(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/factura';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }


}
