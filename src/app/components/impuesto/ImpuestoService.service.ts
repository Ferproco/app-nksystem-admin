import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Impuesto } from '../model/Impuesto.model';



@Injectable()
export class ImpuestoService{

  lstImpuestos: Impuesto[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarImpuestos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/impuesto';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarImpuesto(id: number, idnegocio: number, impuesto: Impuesto){

    const body = {
      idimpuesto: id,
      nombreimpuesto: impuesto.nombreimpuesto,
      normal: impuesto.normal,
      recargo: 0,
      fechaini: new Date(impuesto.fechaini),
      fechafin: new Date(impuesto.fechaini),
      status: impuesto.status === '1' ? 'ACTIVO' : 'INACTIVO',
      codnegocio: idnegocio,
      idtipoimpuesto: Number(impuesto.idtipoimpuesto)
    };

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/impuesto';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminarImpuesto(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/impuesto/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }
}
