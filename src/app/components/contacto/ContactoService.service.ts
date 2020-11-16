import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Contacto } from '../model/Contacto.model';



@Injectable()
export class ContactoService{

  lstContactos: Contacto[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarContactos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/contacto';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarContacto(id: number, contacto: Contacto){
    console.log('el contacto enviado es ' + JSON.stringify(contacto));
    const body = {
      idi: id,

    };
    console.log('id ' + id + 'contacto ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/contacto';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }


}
