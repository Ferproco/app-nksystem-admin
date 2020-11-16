import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Contacto } from '../../model/Contacto.model';

@Injectable()
export class TipoContribuyenteService{

  lstTipoIdentificacion: Contacto[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarTipoContribuyente(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipocontribuyente';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
