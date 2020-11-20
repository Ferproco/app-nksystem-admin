import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Departamento } from '../model/Departamento.model';
import { ListaPrecio } from '../model/ListaPrecio.model';

@Injectable()
export class ListaPrecioService{

  lstListaPrecios: ListaPrecio[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarListaPrecios(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/listaprecio';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
