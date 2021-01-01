export class TipoImpuesto{
    id: number;
    nombretipoimpuesto: string;
    codnegocio: number ;
    status: string;

    constructor( id: number, nombretipoimpuesto: string, codnegocio: number, status: string){
       this.id = id;
       this.nombretipoimpuesto = nombretipoimpuesto;
       this.codnegocio = codnegocio;
       this.status = status;
    }
}
