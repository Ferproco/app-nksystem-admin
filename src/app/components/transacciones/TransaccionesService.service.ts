import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Impuesto } from '../model/Impuesto.model';
import { Transacciones } from '../model/Transacciones.model';



@Injectable()
export class TransaccionesService{

  lstTransacciones: Transacciones[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarTransacciones(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/transacciones';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarTransaccion(id: number, transaccion: Transacciones){
    console.log(JSON.stringify(transaccion));
    const body = {
      
    };
    console.log('id ' + id + 'transaccion ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/transacciones';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }


}