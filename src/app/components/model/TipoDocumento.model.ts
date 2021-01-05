export class TipoDocumento{
   
	public idtipodocumento:number;  
	public nombre:string;
	public codnegocio:number;
    public status:string;
    
constructor(json: any = null){

    if (json !== null) {
        this.idtipodocumento=json.idtipodocumento;  
        this.nombre=json.nombre;
        this.codnegocio=json.codnegocio;
        this.status=json.status;

    }
}


}