import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class DocumentosVentasService {

  uriapi: string = Api.url;
  constructor(private httpClient: HttpClient) { }

  listarDocumentosPorTipo(codnegocio: string, tipodocumento: string){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/documentoventa/tipo/' + tipodocumento;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
