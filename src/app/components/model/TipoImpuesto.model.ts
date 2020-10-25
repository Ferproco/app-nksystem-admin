export class TipoImpuesto{
    id:number;
    nombretipoimpuesto:string;
    codnegocio:string ;

    constructor( id:number, nombretipoimpuesto:string, codnegocio:string){
       this.id=id;
       this.nombretipoimpuesto=nombretipoimpuesto;
       this.codnegocio=codnegocio;

    }
}