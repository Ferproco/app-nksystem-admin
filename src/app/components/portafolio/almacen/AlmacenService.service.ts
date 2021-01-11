import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Almacen } from '../../model/Almacen.model';


@Injectable()
export class AlmacenService{

  lstAlmacenes: Almacen[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarAlmacenes(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/almacen';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarAlmacen(id: number, almacen: Almacen){
    console.log(JSON.stringify(almacen));
    const body = {
      idalmacen: id,
      codalmacen:'',
      codnegocio: '',
      nombre: almacen.nombre,
      principal: almacen.principal === '1' ? true : false,
      tipoalmacen:'',
      direccion: almacen.direccion,
      status: almacen.status === '1' ? 'ACTIVO' : 'INACTIVO',

    };
    console.log('id ' + id + 'almacen ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/almacen';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }



}