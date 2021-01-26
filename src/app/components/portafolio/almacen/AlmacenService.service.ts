import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Almacen } from '../../model/Almacen.model';


@Injectable()
export class AlmacenService{

  lstAlmacenes: Almacen[] = [];
  uriapi: string = Api.url;
  value: any;
  
  Eliminar = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient){

  }

  listarAlmacenes(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/almacen';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarAlmacen(id: number,idnegocio:number, almacen: Almacen){
    console.log(JSON.stringify(almacen));
  
    const body = {
      idalmacen: Number(id),
      codalmacen:almacen.codalmacen,
      codnegocio: Number(idnegocio),
      nombre: almacen.nombre,
      principal: Number(almacen.principal) === 1 ? true : false,
      tipoalmacen:almacen.tipoalmacen,
      direccion: almacen.direccion,
      status: Number(almacen.status) === 1 ? 'Activo' : 'Inactivo',

    };
    console.log('id ' + id + 'almacen ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/almacen';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminarAlmacen(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/almacen/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }
  mostrarAlmacen(id: number){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/almacen/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

}
