export class DetallesDocumentoVenta{
    public id :number;
    public codnegocio: number;
    public coddocumentoventa: number;
    public codarticulo: number;
    public codimpuesto: number;
    public codunidadmedida: number;
    public codalmacen: number;   
    public cantidad: number;
    public preciounitariosiniva: number;
    public montototalconiva: number;
    public baseimponible: number;
    public porcentajedescuento: number;
    public montodescuento:number;
    public porcentajeimpuesto:number;
    public montoimpuesto:number;
    public islr:number;
    public porcentajeislr:number;
    public status: string;
    public tipoarticulo: string;      
    public fecha : Date = new Date();
    public serial: string;
    public garantia: string;
    public tipodocumento: string;
    
constructor(json: any = null){
    this.id= json.id ;
    this.codnegocio=json.codnegocio;
    this.coddocumentoventa=json.coddocumentoventa;
    this.codarticulo=json.codarticulo;
    this.codimpuesto=json.codimpuesto;
    this.codunidadmedida=json.codunidadmedida;
    this.codalmacen=json.codalmacen;   
    this.cantidad=json.cantidad;
    this.preciounitariosiniva=json.preciounitariosiniva;
    this.montototalconiva=json.montototalconiva;
    this.baseimponible=json.baseimponible;
    this.porcentajedescuento=json.porcentajedescuento;
    this.montodescuento=json.montodescuento;
    this.porcentajedescuento=json.porcentajeimpuesto;
    this.montoimpuesto=json.montoimpuesto;
    this.islr=json.islr;
    this.porcentajeislr=json.porcentajeislr;
    this.status=json.status;
    this.tipoarticulo=json.tipoarticulo;      
    this.fecha=json.fecha;
    this.serial=json.serial;
    this.garantia=json.garantia;
    this.tipodocumento=json.tipodocumento;

}

}