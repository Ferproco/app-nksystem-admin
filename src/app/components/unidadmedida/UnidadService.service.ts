import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Cliente } from '../model/Cliente.model';
import { UnidadMedida } from '../model/UnidadMedida.model';


@Injectable()
export class UnidadService{

  lstUnidades: UnidadMedida[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarUnidades(codnegocio: string) {
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/unidadmedida';
    return this.httpClient.get(endpoint, { headers: httpHeaders });
  }
  guardarUnidad(id: number, unidad: UnidadMedida){
    console.log(JSON.stringify(unidad));
    const body = {
      id: id,
      abrevunidadmedida: unidad.abrevunidadmedida,
      nomunidadmedida: unidad.nomunidadmedida,
      codnegocio: '',
      
    };
    console.log('id ' + id + 'unidad ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/unidadmedida';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }
}
