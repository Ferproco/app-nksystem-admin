export class Vendedor {

    codigo: string;
    nombre: string;
    porcfclimp: number;
    porclclimp: number;
    porcfclexp: number;
    interno: string;
    cobrador: string;
    direccionfiscal: string;
    correoe: string;
    codnegocio: string;
    codzona: number;
    codusuario: string;
    montometa: number;
    status: string;

    constructor(cod: string, nombr: string, porcfcli: number, porccli: number, porcfcle: number, inter: string, cobrad: string, dir: string, corre: string, codneg: string, codzon: number, codusu: string, meta: number, stat: string) {

        this.codigo = cod;
        this.nombre = nombr;
        this.porcfclimp = porcfcli;
        this.porclclimp = porccli;
        this.porcfclexp = porcfcle;
        this.interno = inter;
        this.cobrador = cobrad;
        this.direccionfiscal = dir;
        this.correoe = corre;
        this.codnegocio = codneg;
        this.codzona = codzon;
        this.codusuario = codusu;
        this.montometa = meta;
        this.status = stat;
    }
}