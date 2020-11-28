export class Articulo {
    id:number;
    codigo: string;
    nomarticulo: string;
    codmarca: number;
    codfamilia: number;
    codunidadmedida:number;
    codimpuesto:number;
    preciosugerido: number;
    codigobarraprincipal: string;
    referencia:string;
    serial: string;
    status: string;
    descripcionlarga:string;   
    stockminimo: number;
    stockmaximo: number;
    puntoreorden: number;
    

    origen: string;
    imagen: string;
    nombimagen: string;
   
    alto: number;
    ancho: number;
    compuesto: boolean;
    costodirecto: number;
    costoreferencial: number;
    costoreposicion: number;
    empacado: boolean;
    fraccionado: boolean;
    facturable: boolean;
    pctdescuento: number;
    peso: number;
    profundidad: number;
    serializado: boolean;
    sinexistencia: boolean;
    tipoarticulo: string;
    tipocosto: string;
    ubicacion: string;
    ultimocosto: number;
    costoreal: number;
    descuentoprov1: number;
    descuentoprov2: number;
    descuentoprov3: number;
    descuentoprov4: number;
    costobase: number;
    tipodescuento: string;
    usacesta: boolean;
    precioporempaque: boolean;
    codtipoiva: string;
    codtipislr: number;
    codmoneda: number;
    codpresentacion: number;
    codtipo: number;
    codsabor: number;
    codnegocio: string;
    codvendedor: string;
    codlinea: number;
    aplicalista: boolean;
    merma: number;
    cantreorden: number;
    despostable: boolean;
    fechaultcompra: string;
    color: string;
    
    constructor(
      id:number,
      codigo: string,
      nomarticulo: string,
      codmarca: number,
      codfamilia: number,
      codunidadmedida:number,
      codimpuesto:number,
      pro_codigo: string,      
      preciosugerido: number,
      codigobarraprincipal: string,
      referencia:string,
      serial: string,
      stockminimo: number,
      stockmaximo: number,
      puntoreorden: number,
      origen: string,
      imagen: string,
      nombimagen: string,
      status: string,
      alto: number,
      ancho: number,
      compuesto: boolean,
      costodirecto: number,
      costoreferencial: number,
      costoreposicion: number,
      descripcionlarga: string,
      empacado: boolean,
      fraccionado: boolean,
      facturable: boolean,
      pctdescuento: number,
      peso: number,
      profundidad: number,
      serializado: boolean,
      sinexistencia: boolean,
      tipoarticulo: string,
      tipocosto: string,
      ubicacion: string,
      ultimocosto: number,
      costoreal: number,
      descuentoprov1: number,
      descuentoprov2: number,
      descuentoprov3: number,
      descuentoprov4: number,
      costobase: number,
      tipodescuento: string,
      usacesta: boolean,
      precioporempaque: boolean,
      codtipoiva: string,
      codtipislr: number,
      codmoneda: number,
      codpresentacion: number,
      codtipo: number,
      codsabor: number,
      codnegocio: string,
      codvendedor: string,
      codlinea: number,
      aplicalista: boolean,
      merma: number,
      cantreorden: number,
      despostable: boolean,
      fechaultcompra: string,
      color: string
      ) {

        this.id=id;
        this.codigo=codigo;
        this.nomarticulo=nomarticulo;
        this.codmarca= codmarca;
        this.codfamilia= codfamilia;
        this.codunidadmedida=codunidadmedida;
        this.codimpuesto=codimpuesto;
        this.preciosugerido=preciosugerido;
        this.codigobarraprincipal= codigobarraprincipal;
        this.referencia=referencia;
        this.serial=serial;
        this.status=status;
        this.codmarca= codmarca;
        this.codfamilia=codfamilia;       
        
        
        this.stockminimo=stockminimo;
        this.stockmaximo=stockmaximo;
        this.puntoreorden=puntoreorden;
        this.codigobarraprincipal=codigobarraprincipal;
        this.origen=origen;
        this.imagen=imagen;
        this.nombimagen=nombimagen;
        
        this.alto=alto;
        this.ancho=ancho;
        this.compuesto=compuesto;
        this.costodirecto=costodirecto;
        this.costoreferencial= costoreferencial;
        this.costoreposicion= costoreposicion;
        this.descripcionlarga=descripcionlarga;
        this.empacado=empacado;
        this.fraccionado=fraccionado;
        this.facturable=facturable;
        this.pctdescuento=pctdescuento;
        this.peso=peso;
        this.profundidad=profundidad;
        this.serializado=serializado;
        this.sinexistencia=sinexistencia;
        this.tipoarticulo=tipoarticulo;
        this.tipocosto=tipocosto;
        this.ubicacion=ubicacion;
        this.ultimocosto=ultimocosto;
        this.costoreal=costoreal;
        this.descuentoprov1=descuentoprov1;
        this.descuentoprov2=descuentoprov2;
        this.descuentoprov3= descuentoprov3;
        this.descuentoprov4=descuentoprov4;
        this.costobase=costobase;
        this.tipodescuento=tipodescuento;
        this.usacesta=usacesta;
        this.precioporempaque=precioporempaque;
        this.codtipoiva= codtipoiva;
        this.codtipislr=codtipislr;
        this.codmoneda=codmoneda;
        this.codpresentacion=codpresentacion;
        this.codtipo=codtipo;
        this.codsabor=codsabor;
        this.codnegocio=codnegocio;
        this.codvendedor=codvendedor;
        this.codlinea=codlinea;
        this.aplicalista=aplicalista;
        this.merma=merma;
        this.cantreorden=cantreorden;
        this.despostable=despostable;
        this.serial=serial;
        this.fechaultcompra=fechaultcompra;
        this.color=color;
        
    }
}
