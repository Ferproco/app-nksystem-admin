import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Articulo } from '../../model/Articulo.model';
import { Kardex } from '../../model/Kardex.model';
import { ArticuloService } from '../../portafolio/articulo/ArticuloService.service';
import { KardexService } from '../KardexService.service';

@Component({
  selector: 'app-catalogo-valorkardex',
  templateUrl: './catalogo-valorkardex.component.html',
  styleUrls: ['./catalogo-valorkardex.component.css']
})


export class CatalogoValorkardexComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Articulos';
  lstKardex: Kardex[] = [];
  lstArticulos: Articulo[] = [];
  tipoproductoconfig = 'T';
  sortedData;
  filtrararticulos = '';

  //tipoproductoconfig = 'T';

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  LengthTable = 0;
  idnegocio: number;

  showModalBox: boolean = false;
  PuedeEliminar: boolean = false;

  //displayedColumns: string[] = ['Fecha','Codigo', 'Items','Tercero','Tipo Doc','Documento Asociado' ,'Concepto', 'Cantidad' , 'Und Medida'  ,'Costo Promedio','Total','Status'];
  
  displayedColumns: string[] =['Codigo', 'Nombre',  'Categoria' ,'Precio', 'Und Medida'  ,'Impuesto','Status', 'Acción'];
 // dataSource: MatTableDataSource<Kardex>;
  dataSource: MatTableDataSource<Articulo>;
  selection = new SelectionModel<Kardex>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private articuloServicio: ArticuloService,
              private kardexServicio: KardexService,    
              private toastr: ToastrService,
              private router: Router) { 
              this.idnegocio = 1;
    }

  ngOnInit(): void {
    //this.listarkardex();
    this.listarArticulosPorTipo(this.tipoproductoconfig);
  }
  ngAfterViewInit() {

  }

  private listarArticulosPorTipo(tipo: string): void {
    this.loading = true;
    this.lstArticulos = [];
    let status = 0;
    this.articuloServicio.listarArticulosPorTipo('', tipo)
      .subscribe(response => {
        const listaarticulo = response as Articulo[];
        listaarticulo.forEach(element => {
          if (element.status === 'ACTIVO') {
            status = 1;
          }
          else {
            status = 0;
          }
          this.lstArticulos.push(element);
        });


        this.dataSource = new MatTableDataSource(this.lstArticulos);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstArticulos.length;
        this.sortedData = this.lstArticulos.slice();
        this.loading = false;
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 404) {

          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
        }));
  }
  /*listarkardex() {
    this.loading = true;
    this.lstKardex = [];
    let status = 0;
    this.kardexServicio.listarKardex('')
      .subscribe(response => {
        const listakardex = response as Kardex[];
        listakardex.forEach(element => {
        if (element.status === 'ACTIVO') {
            status = 1;
          }
          else {
            status = 0;
          }
          
          this.lstKardex.push(element);
        });
        this.dataSource = new MatTableDataSource(this.lstKardex);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstKardex.length;
        this.sortedData = this.lstKardex.slice();
        this.loading = false;
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 404) {

          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
        }));
  }
 */

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  sortData(sort: Sort) {
    const data = this.lstKardex.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    /*this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'calories': return compare(+a.calories, +b.calories, isAsc);
        case 'fat': return compare(+a.fat, +b.fat, isAsc);
        case 'carbs': return compare(+a.carbs, +b.carbs, isAsc);
        case 'protein': return compare(+a.protein, +b.protein, isAsc);
        default: return 0;
      }
    });*/
  }

  Ver(id: number){

    if (0){
      // Dont open the modal
      this.showModalBox = false;
    } else {
       // Open the modal
       this.showModalBox = true;
    }
  }

 

 
  


  ExportarExcel(){

  }
  ExportarTxt(){

  }

  Refrescar() {
    //this.tipoproductoconfig = 'T';
   // this.listarArticulosPorTipo(this.tipoproductoconfig);
  }
  Importar(){

  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.LengthTable;//this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Articulo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  


}
