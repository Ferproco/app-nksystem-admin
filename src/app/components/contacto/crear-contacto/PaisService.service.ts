import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Contacto } from '../../model/Contacto.model';
import { Pais } from '../../model/Pais.model';

@Injectable()
export class PaisService{

  lstPais: Pais[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarPais(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/pais';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
