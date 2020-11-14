import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormaPago } from '../../model/FormaPago.model';
import { FormaPagoService } from '../FormaPagoService.service';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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

  displayedColumns: string[] = ['Codigo', 'Nombre', 'Aplicar', 'Tipo' , 'Dias Plazo' , 'Status', 'Acción'];
  dataSource: MatTableDataSource<FormaPago>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formaPagoService: FormaPagoService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarFormaPagos();

  }

  ngAfterViewInit() {

  }

  listarFormaPagos(){
    this.loading = true;
    this.formaPagoService.listarFormaPagos('')
   .subscribe(response => {
     this.lstFormaPagos = response as FormaPago[];
     this.dataSource = new MatTableDataSource(this.lstFormaPagos);
     this.dataSource.paginator = this.paginator;
     this.LengthTable = this.lstFormaPagos.length;
     this.sortedData = this.lstFormaPagos.slice();
     this.loading = false;
   },
   ((error: HttpErrorResponse) => {
    this.loading = false;
    if (error.status === 404){

    }
    else{
      this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
      { enableHtml: true, closeButton: true });
    }
  }));
 }

  registrarformapago() {

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

  Ver(){

  }

  Modificar(){

  }

  Eliminar(){

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

}
