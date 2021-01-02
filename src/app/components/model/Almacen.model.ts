export class Almacen {
  public idalmacen: number;
  public codalmacen: string;
  public codnegocio: string;
  public nombre: string;
  public principal: string;
  public tipoalmacen: string;
  public direccion: string;
  public status: string;

  constructor(json: any = null) {

    if (json !== null) {
      this.codalmacen = json.codalmacen;
      this.codnegocio = json.codnegocio;
      this.nombre = json.nombre;
      this.principal = json.principal;
      this.tipoalmacen = json.tipoalmacen;
      this.direccion = json.direccion;
      this.idalmacen = json.idalmacen;
      this.status = json.status;
    }
  }
}
