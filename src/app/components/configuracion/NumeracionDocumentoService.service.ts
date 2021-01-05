import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { NumeracionDocumento } from "../model/NumeracionDocumento.model";
import { Api } from 'src/app/config';

@Injectable()
export class NumeracionDocumentoService{

  lstNumeracionDocumentos: NumeracionDocumento[] = [];
  uriapi: string = Api.url;
  value: any;

  Eliminar = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient){ }

  listarNumeracionDocumentos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/numeraciondocumento';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
  /*listarNumeracionPorTipo(codnegocio: string, tipo: string){
    let tipoitems = 0;
    if (tipo === 'P'){
      tipoitems = 1;
    }
    else if (tipo === 'S'){
      tipoitems = 2;
    }
    else if (tipo === 'M'){
      tipoitems = 3;
    }
    else if (tipo === 'G'){
      tipoitems = 4;
    }
    else if (tipo === 'T'){
      tipoitems = 5;
    }
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/numeraciondocumento/tipo/' + tipoitems;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }*/
  guardarNumeracionDocumento(idIn: number, idnegocio: number, numeraciondocumento: NumeracionDocumento){
    console.log('el Numero de Docuemnto enviado es ' + JSON.stringify(numeraciondocumento));
    const body = {
      idnumeraciondocumento: Number(idIn),
      codnegocio: Number(idnegocio),
      nombre: numeraciondocumento.nombre,
      codtipodocumento: Number(numeraciondocumento.codtipodocumento),
      resolucion: numeraciondocumento.resolucion,
      prefijo: numeraciondocumento.prefijo,
      proximonumerodocumento: Number(numeraciondocumento.proximonumerodocumento),
      desdenumero: Number(numeraciondocumento.desdenumero),
      hastanumero: Number(numeraciondocumento.hastanumero),
      status: Number(numeraciondocumento.status) === 1 ? 'ACTIVO' : 'INACTIVO',
      

    };
    console.log('id ' + idIn + 'numeraciondocumento ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/numeraciondocumento';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }
  eliminarNumeracionDocumento(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/numeraciondocumento/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }


  mostrarNumeracionDocumento(id: number){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/numeraciondocumento/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
