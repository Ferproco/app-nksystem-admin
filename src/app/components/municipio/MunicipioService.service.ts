import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Departamento } from '../model/Departamento.model';
import { Municipio } from '../model/Municipio.model';

@Injectable()
export class MunicipioService{

  lstMunicipios: Municipio[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarMunicipios(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/municipio';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  listarMunicipiosporDepartamento(codnegocio: string, iddepartamento: number){
   
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/municipio/' + iddepartamento;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
