export class Marca {
    codmarca: number;
    nommarca: string;
    codnegocio: string;
    status:string;

    constructor(codmarca: number, nommarca: string, codnegocio: string,status:string) {
        this.codmarca = codmarca;
        this.nommarca = nommarca;
        this.codnegocio = codnegocio;
        this.status=status;

    }
    

}