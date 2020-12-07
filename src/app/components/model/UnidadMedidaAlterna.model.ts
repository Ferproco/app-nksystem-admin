export class UnidadMedidaAlterna{
    public id:number;
    public codunidadmedida:number;
    public codarticulo:number;
    public valorcoversion:number;
    public codnegocio:number;
    public codunidadminima:number;
    
    constructor(json: any = null){
        if(json !== null) {

            this.id= json.id;
            this.codunidadmedida = json.codunidadmedida;
            this.codarticulo = json.codarticulo;
            this.valorcoversion =  json.valorcoversion;
            this.codnegocio = json.codnegocio;
            this.codunidadminima = json.codunidadminima;


        }
    }
}