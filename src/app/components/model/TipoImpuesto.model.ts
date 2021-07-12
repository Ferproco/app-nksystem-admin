export class TipoImpuesto{
    public id: number;
    public nombretipoimpuesto: string;
    public codnegocio: number ;
    public status: string ='Activo';

    constructor(json: any = null){
      if (json !== null) {
       this.id = json.id;
       this.nombretipoimpuesto = json.nombretipoimpuesto;
       this.codnegocio = json.codnegocio;
       this.status = json.status;
      }
    }
}
