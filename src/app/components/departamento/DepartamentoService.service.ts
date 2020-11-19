import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Departamento } from '../model/Departamento.model';

@Injectable()
export class DepartamentoService{

  lstDepartamentos: Departamento[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarDepartamentos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/departamento';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
