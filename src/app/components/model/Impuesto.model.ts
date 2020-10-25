export class Impuesto {


    idimpuesto: number;
    tipoimpuesto: string;
    normal: number;
    recargo: number;
    fechaini: string;
    fechafin: string;
    status: string;
    codnegocio: string;
    constructor(idimpuesto: number, tipoimpuesto: string, normal: number, recargo: number, fechaini: string, fechafin: string, status: string, codnegocio: string) {

        this.idimpuesto = idimpuesto;
        this.tipoimpuesto = tipoimpuesto;
        this.normal = normal;
        this.recargo = recargo;
        this.fechaini = fechaini;
        this.fechafin = fechafin;
        this.status = status;
        this.codnegocio = codnegocio;


    }
}