export class Categoria{

    codfamilia:number;
	nomfamilia:string;
	codnegocio:number ;
    imagen: string;
    status:string;    
     
    constructor(codfamilia:number, nomfamilia:string, codnegocio:number , imagen: string,status:string){

        this.codfamilia=codfamilia;
        this.nomfamilia=nomfamilia;
        this.codnegocio=codnegocio;
        this.imagen=imagen;
        this.status=status;
    }
}