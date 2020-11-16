export class FormaPago {
  id: number;
  nombre: string;
  codnegocio: number;
  dias: number;
  status: string;


  constructor(id: number, nombre: string, codnegocio: number, dias: number, status: string) {
    this.id = id;
    this.nombre = nombre;
    this.codnegocio = codnegocio;
    this.dias = dias;
    this.status = status;
  }
}
