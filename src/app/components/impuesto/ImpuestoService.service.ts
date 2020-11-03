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

  guardarImpuesto(id: number, impuesto: Impuesto){
    console.log(JSON.stringify(impuesto));
    const body = {
      idimpuesto: id,
      nombreimpuesto: impuesto.nombreimpuesto,
      normal: impuesto.normal,
      recargo: 0,
      fechaini: new Date(impuesto.fechaini),
      fechafin: new Date(impuesto.fechaini),
      status: impuesto.status,
      codnegocio: '',
      idtipoimpuesto: impuesto.idtipoimpuesto
    };
    console.log('id ' + id + 'impuesto ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/impuesto';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }


}
