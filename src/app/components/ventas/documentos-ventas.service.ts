
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { DocumentoVenta } from '../model/DocumentoVenta.model';


@Injectable({
  providedIn: 'root'
})
export class DocumentosVentasService {

  uriapi: string = Api.url;
  constructor(private httpClient: HttpClient) { }

  listarDocumentosPorTipo(codnegocio: string, tipodocumento: string){
    console.log('el tipo es '+ tipodocumento);
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/documentoventa/tipo/' + tipodocumento;
    return this.httpClient.get(endpoint, {headers: httpHeaders});  }

  guardarDocumentoVenta(idIn: number, idnegocio: number, documento: DocumentoVenta){
    console.log('el documento enviado es ' + JSON.stringify(documento));

    const fechastr = documento.fechaemision.toString().split('-');
    console.log('la fecha '+ fechastr);
    const year = Number(fechastr[2]);
    const month = Number(fechastr[1]) - 1;
    const date = Number(fechastr[0]);

    const fechastrvence = documento.fechavencimiento.toString().split('-');
    console.log('la fecha vencimiento '+ fechastrvence);
    const yearvence = Number(fechastrvence[2]);
    const monthvence = Number(fechastrvence[1]) - 1;
    const datevence = Number(fechastrvence[0]);

    const body = {
      id: Number(idIn),
      codnegocio: Number(idnegocio),
      numerodocumento:documento.numerodocumento,
      codformapago: Number(documento.codformapago),
      codcontacto: Number(documento.codcontacto),
      codvendedor:Number(documento.codvendedor),
      fechaemision: new Date(year, month, date),
      fechavencimiento: new Date(yearvence, monthvence, datevence),
      fecha: new Date(),
      referencia:documento.referencia,
      status: Number(documento.status) === 1 ? 'ACTIVO' : 'INACTIVO',
      baseimp:Number(documento.baseimp),
      isrl: Number(documento.isrl),
      observacion: documento.observacion,
      numcontrol: documento.numcontrol,
      numretencion: documento.numretencion,
      pctiva_a: Number(documento.pctiva_a),
      pctiva_b: Number(documento.pctiva_b),
      descuento:Number(documento.descuento),
      subtotal: Number(documento.subtotal),
      total: Number(documento.total),
      montoretenido: Number(documento.montoretenido),
      status_cobro: documento.status_cobro,
      tipodocumento: documento.tipodocumento,
      contable: documento.contable,
      numeroz: documento.numeroz,
      status_impresion:documento.status_impresion,
      codruta: documento.codruta

    };
    console.log('id ' + idIn + 'documento ' + JSON.stringify(body));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/documentoventa';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

}
