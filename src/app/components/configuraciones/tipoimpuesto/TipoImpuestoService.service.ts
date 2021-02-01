import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Api } from 'src/app/config';
import { TipoImpuesto } from '../../model/TipoImpuesto.model';



@Injectable()
export class TipoImpuestoService{

  lstTipoImpuestos: TipoImpuesto[] = [];
  uriapi: string = Api.url;

  constructor(private httpClient: HttpClient){

  }

  listarTipoImpuestos<T>(codnegocio: string): Observable<T>{
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipoimpuesto';
    return this.httpClient.get<T>(endpoint, {headers: httpHeaders});
  }

  guardarTipoImpuesto(id: number, idnegocio: number, tipoimpuesto: TipoImpuesto){

    const body = {
      id: id,
      nombretipoimpuesto: tipoimpuesto.nombretipoimpuesto,
      status: tipoimpuesto.status === '1' ? 'ACTIVO' : 'INACTIVO',
      codnegocio: idnegocio
    };

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipoimpuesto';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminarTipoImpuestos(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipoimpuesto/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }

}
