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

    constructor(
      idimpuesto: number,
      nombreimp: string,
      idtipoimpuesto: number,
      normal: number,
      recargo: number,
      fechaini: string,
      fechafin: string,
      status: string,
      codnegocio: string) {

        this.idimpuesto = idimpuesto;
        this.nombreimpuesto = nombreimp;
        this.idtipoimpuesto = idtipoimpuesto;
        this.normal = normal;
        this.recargo = recargo;
        this.fechaini = fechaini;
        this.fechafin = fechafin;
        this.status = status;
        this.codnegocio = codnegocio;


    }
}
