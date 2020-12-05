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

  mostrarContactos(id: number){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/contacto/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  listarContactos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/contacto';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarContacto(id: number, idnegocio: number, contacto: Contacto){
    console.log('el contacto enviado es ' + JSON.stringify(contacto));
    const body = {
      codtipocontibuyente: Number(contacto.codtipocontibuyente),
      codtipoidentificacion: Number(contacto.codtipoidentificacion),
      codnegocio: Number(idnegocio),
      numeroidentificacion: contacto.numeroidentificacion,
      nombreprimero: contacto.nombreprimero,
      nombresegundo: contacto.nombresegundo,
      apellidoprimero: contacto.apellidoprimero,
      apellidosegundo: contacto.apellidosegundo,
      razonsocial: contacto.razonsocial,
      telefonomovil: contacto.telefonomovil,
      telefonofijo1: contacto.telefonofijo1,
      telefonofijo2: contacto.telefonofijo2,
      telefonofax: contacto.telefonofax,
      direccionfiscal: contacto.direccionfiscal,
      correoe: contacto.correoe,
      fecharegistro: new Date(contacto.fecharegistro),
      codtipocontacto: Number(contacto.codtipocontacto),
      codvendedor: Number(contacto.codvendedor),
      codformapago: Number(contacto.codformapago),
      codtipopersona: Number(contacto.codtipopersona),
      codpais: Number(contacto.codpais),
      coddepartamento: Number(contacto.coddepartamento),
      codmunicipio: Number(contacto.codmunicipio),
      lugarenvio: contacto.lugarenvio,
      codlistaprecio: Number(contacto.codlistaprecio),
      direccionexogena: contacto.direccionexogena,
      paginaweb: contacto.paginaweb,
      limitecreditohasta: Number(contacto.limitecreditohasta),
      fechacreditodesde: new Date(contacto.fechacreditodesde),
      fechacreditohasta: new Date(contacto.fechacreditohasta),
      observaciones: contacto.observaciones,
      descuentocondicionado: contacto.descuentocondicionado,
      codigodv: contacto.codigodv,
      responsableiva: contacto.responsableiva,
      status: contacto.status === '1' ? 'ACTIVO' : 'INACTIVO'

    };
    console.log('id ' + id + 'contacto ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/contacto';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }


}
