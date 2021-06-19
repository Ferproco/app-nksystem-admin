import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoImpuesto } from 'src/app/components/model/TipoImpuesto.model';
import { TipoImpuestoService } from '../TipoImpuestoService.service';
import { MensajeEliminarComponent } from 'src/app/components/mensajeria/mensaje-eliminar/mensaje-eliminar.component';

@Component({
  selector: 'app-catalogo-tipo-impuesto-component',
  templateUrl: './catalogo-tipo-impuesto-component.component.html',
  styleUrls: ['./catalogo-tipo-impuesto-component.component.css']
})
export class CatalogoTipoImpuestoComponentComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Tipos de impuesto';
  lstTipoImpuesto: TipoImpuesto[] = [];
  filtrarformapago = '';
  LengthTable = 0;
  sortedData;
  idnegocio: number;


  bsModalRef: BsModalRef;

  displayedColumns: string[] = ['select', 'Codigo', 'Nombre' , 'Status', 'Acción'];
  dataSource: MatTableDataSource<TipoImpuesto>;
  selection = new SelectionModel<TipoImpuesto>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tipoImpuestoService: TipoImpuestoService,
              private router: Router,
              private toastr: ToastrService,
              private modalService: BsModalService) {
                this.idnegocio = 1;
              }

  ngOnInit(): void {
    this.listarTipoImpuesto();

  }


  listarTipoImpuesto() {
    this.loading = true;
    this.lstTipoImpuesto = [];
    let status = '';
    this.tipoImpuestoService.listarTipoImpuestos()
      .subscribe(response => {
        this.lstTipoImpuesto = response as any[];
        //listatipos.forEach(element => {
          /*if (element.status === 'ACTIVO') {
            status = 1;
          }
          else {
            status = 0;
          }*/
          //this.lstTipoImpuesto.push(new TipoImpuesto(element.id, element.nombretipoimpuesto, this.idnegocio, status));
        //});
        this.dataSource = new MatTableDataSource(this.lstTipoImpuesto);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstTipoImpuesto.length;
        this.sortedData = this.lstTipoImpuesto.slice();
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

  registrar() {
    this.router.navigate(['main/dashboard/configuraciones/creartipoimpuesto']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  sortData(sort: Sort) {
    const data = this.lstTipoImpuesto.slice();
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


  }

  Modificar(id: number){

    this.router.navigate(['configuracion/creartipoimpuesto', id]);
  }

  Eliminar(id: number) {
    this.bsModalRef = this.modalService.show(MensajeEliminarComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      if (result){
        this.eliminarporcodigo(id);
      }
    });

  }

  eliminarporcodigo(id: number){
    this.loading = true;
    this.tipoImpuestoService.eliminarTipoImpuestos(id)
      .subscribe(response => {
        const respuesta = response;
        this.loading = false;
        this.listarTipoImpuesto();
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
    this.listarTipoImpuesto();
  }
  Importar(){

  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.LengthTable;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TipoImpuesto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
