import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Negocio } from "../../model/Negocio.model";

@Injectable()
export class NegocioService {

    lstEmpresas: Negocio[] = [];
    uriapi: string = environment.UrlTransactional;
    value: any;
    constructor(private httpClient: HttpClient) {

    }

    buscarnegocioporid(id: number){
        const body = {
          id: Number(id)
        };
        const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        const endpoint: any = this.uriapi + 'api/negocio/buscarid/' + id;
        return this.httpClient.get(endpoint, {headers: httpHeaders});
      }

}