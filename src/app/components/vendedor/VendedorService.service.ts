import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendedor } from '../model/Vendedor.model';
import { Api } from 'src/app/config';

@Injectable()
export class VendedorService{

  lstVendedores: Vendedor[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }
  listarVendedores(codnegocio: string){
    const body = {
        codnegocio: codnegocio
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/vendedor';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

}