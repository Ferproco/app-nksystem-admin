export class UnidadMedida {
    id: number;
    abrevunidadmedida: string;
    nomunidadmedida: string;
    codnegocio: string;

    constructor(id: number, abrevunidadmedida: string, nomunidadmedida: string, codnegocio: string) {
        this.id = id;
        this.abrevunidadmedida = abrevunidadmedida;
        this.nomunidadmedida = nomunidadmedida;
        this.codnegocio=codnegocio;

    }
}