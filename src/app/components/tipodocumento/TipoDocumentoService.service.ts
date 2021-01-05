import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TipoDocumento } from "../model/TipoDocumento.model";
import { Api } from 'src/app/config';

@Injectable()
export class TipoDocumentoService{

  lstTipoDocumentos: TipoDocumento[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarTipoDocumentos<T>(codnegocio: string): Observable<T>{
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipodocumento';
    return this.httpClient.get<T>(endpoint, {headers: httpHeaders});
  }

  guardarTipoDocumento(id: number, idnegocio: number, tipodocumento: TipoDocumento){

    const body = {
      idtipodocumento: id,
      nombre: tipodocumento.nombre,
      status: tipodocumento.status === '1' ? 'ACTIVO' : 'INACTIVO',
      codnegocio: idnegocio
    };

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipodocumento';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminarTipoDocumento(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipodocumento/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }

}