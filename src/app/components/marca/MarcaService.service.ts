import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Cliente } from '../model/Cliente.model';
import { FormaPago } from '../model/FormaPago.model';
import { Marca } from '../model/Marca.model';


@Injectable()
export class MarcaService{

  lstMarcas: Marca[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarMarcas(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/marca';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }


}
