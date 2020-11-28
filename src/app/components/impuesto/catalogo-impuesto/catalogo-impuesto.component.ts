import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Impuesto } from '../../model/Impuesto.model';
import { ImpuestoService } from '../ImpuestoService.service';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-catalogo-impuesto',
  templateUrl: './catalogo-impuesto.component.html',
  styleUrls: ['./catalogo-impuesto.component.css']
})
export class CatalogoImpuestoComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Impuestos';
  lstImpuestos: Impuesto[] = [];
  LengthTable = 0;
  sortedData;

  displayedColumns: string[] = ['Codigo', 'Nombre', 'Tarifa', 'Tipo Impuesto' , 'Status', 'Acción'];
  dataSource: MatTableDataSource<Impuesto>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private impuestoServicio: ImpuestoService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarImpuestos();
  }

  private listarImpuestos(): void {
    this.loading = true;
    this.impuestoServicio.listarImpuestos('')
      .subscribe(response => {
        this.lstImpuestos = response as Impuesto[];
        this.dataSource = new MatTableDataSource(this.lstImpuestos);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstImpuestos.length;
        this.sortedData = this.lstImpuestos.slice();
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

  registrarimpuestos() {
    this.router.navigate(['configuracion/crearimpuestos']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.lstImpuestos.slice();
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
    this.router.navigate(['configuracion/crearformapagos', id]);
  }

  Eliminar(id: number){

  }

  ExportarExcel(){

  }
  ExportarTxt(){

  }
  Refrescar(){
    this.listarImpuestos();
  }
  Importar(){

  }


}

