import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Usuario } from "../../model/Usuario.model";

@Injectable()
export class UsuarioService{

  lstCategorias: Usuario[] = [];
  uriapi: string = environment.urlAuthentication;

  constructor(private httpClient: HttpClient){

  }

  listarUsuarios(){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'seguridad/usuario/1';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarUsuario(id: number, user: Usuario){

    const body = {
      
    };

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/impuesto';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminarUsuario(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/familia/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }
}