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

  guardarMarca(id: number, idnegocio: number, marca: Marca){

    const body = {
      codmarca: id,
      nommarca: marca.nommarca,
     
      status: marca.status === '1' ? 'ACTIVO' : 'INACTIVO',
      codnegocio: idnegocio,
      
    };

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/marca';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

}
