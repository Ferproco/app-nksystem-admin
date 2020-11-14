import { TipoImpuesto } from './TipoImpuesto.model';
export class Impuesto {


    idimpuesto: number;
    nombreimpuesto: string;
    idtipoimpuesto: number;
    normal: number;
    recargo: number;
    fechaini: string;
    fechafin: string;
    status: string;
    codnegocio: string;
    tipoimpuestos: TipoImpuesto;

    constructor(
      idimpuesto: number,
      nombreimpuesto: string,
      idtipoimpuesto: number,
      normal: number,
      recargo: number,
      fechaini: string,
      fechafin: string,
      status: string,
      codnegocio: string,
      tipoimpuestos: TipoImpuesto) {

        this.idimpuesto = idimpuesto;
        this.nombreimpuesto = nombreimpuesto;
        this.idtipoimpuesto = idtipoimpuesto;
        this.normal = normal;
        this.recargo = recargo;
        this.fechaini = fechaini;
        this.fechafin = fechafin;
        this.status = status;
        this.codnegocio = codnegocio;
        this.tipoimpuestos = tipoimpuestos;
    }
}
