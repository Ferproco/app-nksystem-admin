export class Kardex{

    public id: number = 0;
    public coddocumentoventa: number = 0;
    public codarticulo: number;
    public tipo: string;
    public fecha: Date;
    public documentoasociado: string;
    public cantidad: number;
    public montoxunidad: number = 0;
    public codunidadmedida: number = 0;
    public codunidadalterna: number = 0;
    public cantidadalterna:number = 0;
    public montoxunidadalterna:number = 0;
    public montototal:number = 0;
    public codalmacen:number;
    public concepto:string;
    public origen:string;
    public codnegocio:number;
    public numerocontrol:number;
    public status:string='ACTIVO';

    constructor(json: any = null){
        if (json !== null) {
        this.id = json.id;
        this.coddocumentoventa = json.documento_id;
        this.codarticulo = json.codarticulo;
        this.tipo = json.tipo;
        this.fecha = json.fecha;
        this.documentoasociado = json.documentoasociado;
        this.cantidad = json.cantidad;
        this.montoxunidad = json.montoxunidad;
        this.codunidadmedida = json.codunidadmedida;
        this.codunidadalterna = json.codunidadalterna;
        this.cantidadalterna = json.cantidadalterna;
        this.montoxunidadalterna = json.montoxunidadalterna;
        this.montototal = json.montototal;
        this.codalmacen = json.codalmacen;
        this.concepto = json.concepto;
        this.origen = json.origen;
        this.codnegocio = json.codnegocio;
        this.numerocontrol = json.numerocontrol;
        this.status=json.status;
        }

    }
}
