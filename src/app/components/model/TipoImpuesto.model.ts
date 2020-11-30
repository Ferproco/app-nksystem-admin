export class TipoImpuesto{
    id: number;
    nombretipoimpuesto: string;
    codnegocio: number ;
    status: number;

    constructor( id: number, nombretipoimpuesto: string, codnegocio: number, status: number){
       this.id = id;
       this.nombretipoimpuesto = nombretipoimpuesto;
       this.codnegocio = codnegocio;
       this.status = status;
    }
}
