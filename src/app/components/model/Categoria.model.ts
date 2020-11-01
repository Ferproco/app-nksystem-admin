export class Categoria{

    codfamilia:number;
	
	nomfamilia:string;
	
     negocioId:string ;
	 imagen: string;
    constructor(codfamilia:number, nomfamilia:string, negocioId:string , imagen: string){

        this.codfamilia=codfamilia;
        this.nomfamilia=nomfamilia;
        this.negocioId=negocioId;
        this.imagen=imagen;
    }
}