import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormaPago } from '../../model/FormaPago.model';
import { FormaPagoService } from '../FormaPagoService.service';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import { MensajeEliminarComponent } from '../../mensajeria/mensaje-eliminar/mensaje-eliminar.component';

@Component({
  selector: 'app-catalogo-formapago',
  templateUrl: './catalogo-formapago.component.html',
  styleUrls: ['./catalogo-formapago.component.css']
})
export class CatalogoFormapagoComponent implements OnInit, AfterViewInit  {

  loading = false;
  titulo = 'Listado de Forma Pagos';
  lstFormaPagos: FormaPago[] = [];
  filtrarformapago = '';
  LengthTable = 0;
  sortedData;
  idnegocio: number;

  showModalBox: boolean = false;
  PuedeEliminar: boolean;

  displayedColumns: string[] = ['select', 'Codigo', 'Nombre',  'Dias Plazo' , 'Status', 'Acción'];
  dataSource: MatTableDataSource<FormaPago>;
  selection = new SelectionModel<FormaPago>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formaPagoService: FormaPagoService,
              private router: Router,
              private toastr: ToastrService,) {
                this.idnegocio = 1;
              }

  ngOnInit(): void {
    this.listarFormaPagos();

  }

  ngAfterViewInit() {

  }

  listarFormaPagos() {
    this.loading = true;
    this.lstFormaPagos = [];
    let status = 0;
    this.formaPagoService.listarFormaPagos('')
      .subscribe(response => {
        const listaformas = response as any[];
        listaformas.forEach(element => {
          if (element.status === 'ACTIVO') {
            status = 1;
          }
          else {
            status = 0;
          }
          this.lstFormaPagos.push(new FormaPago(element.id, element.nombre, element.dias, this.idnegocio, status));
        });
        this.dataSource = new MatTableDataSource(this.lstFormaPagos);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstFormaPagos.length;
        this.sortedData = this.lstFormaPagos.slice();
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

  registrarformapago() {
    this.router.navigate(['configuracion/crearformapagos']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  sortData(sort: Sort) {
    const data = this.lstFormaPagos.slice();
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

  Modificar(id: number){

    this.router.navigate(['configuracion/crearformapagos', id]);
  }

  Eliminar(id: number) {

    if (0){
      // Dont open the modal
      this.showModalBox = false;
    } else {
       // Open the modal
       this.showModalBox = true;
    }
    this.formaPagoService.Eliminar.subscribe(
      (respuesta: boolean) => {
        this.PuedeEliminar = respuesta;
        this.eliminarporcodigo(id);
        this.PuedeEliminar = false;
        this.listarFormaPagos();
      }
    );
    if ( this.showModalBox){
      this.showModalBox = false;
    }
  }

  eliminarporcodigo(id: number){
    this.loading = true;
    this.formaPagoService.eliminarFormaPago(id)
      .subscribe(response => {
        const respuesta = response as any;
        console.log('Al eliminar ' + respuesta);
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

  ExportarExcel(){

  }
  ExportarTxt(){

  }
  Refrescar(){
    this.listarFormaPagos();
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
  checkboxLabel(row?: FormaPago): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
