import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { FormaPago } from '../model/FormaPago.model';

@Injectable()
export class FormaPagoService{

  lstFormaPagos: FormaPago[] = [];
  uriapi: string = Api.url;
  value: any;

  constructor(private httpClient: HttpClient){

  }

  listarFormaPagos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/formapago';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
  
  guardarFormaPago(id: number, idnegocio:number,formapago: FormaPago){
    console.log(JSON.stringify(formapago));
    const body = {
      id: id,
      nombre: formapago.nombre,
      dias: formapago.dias,
      codnegocio:idnegocio,      
      status: formapago.status === '1' ? 'ACTIVO' : 'INACTIVO',
     
      
    };
    console.log('id ' + id + 'formapago ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/formapago';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

}
