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

  listarEmpresas() {

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/negocio';
    return this.httpClient.get(endpoint, { headers: httpHeaders });
  }

  buscarnegocioporid(id: number) {
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/negocio/buscarid/' + id;
    return this.httpClient.get(endpoint, { headers: httpHeaders });
  }

  guardarEmpresa(id: number, empresa: Negocio){

    const body = {
      /*accesotoken: '',
      activo: user.activo,
      actualizadoel: null,
      actualizartoken: '',
      borrado: true,
      codigouser: myId,
      creadoel: new Date(),
      email: user.email,
      emailconfirmado: false,
      empresaid: this.empresa.idnegocio,
      esadministrador: user.esadministrador,
      imagen: '',
      nombrecompleto: user.nombrecompleto,
      nombreusuario: user.email,
      ocupacion: user.ocupacion,
      password: user.password, 
      telefono: user.telefono, 
      telefonoconfirmado: false,
      valido: true,
      vencepassword: null*/
    };

   
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'seguridad/usuario';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminarNegocio(id: number) {
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/negocio/' + id;
    return this.httpClient.delete(endpoint, { headers: httpHeaders });
  }

}