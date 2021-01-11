import { HttpErrorResponse } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Almacen } from 'src/app/components/model/Almacen.model';
import { AlmacenService } from '../AlmacenService.service';

@Component({
  selector: 'app-catalogo-almacen',
  templateUrl: './catalogo-almacen.component.html',
  styleUrls: ['./catalogo-almacen.component.css']
})
export class CatalogoAlmacenComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Almacenes';
  lstAlmacenes: Almacen[] = [];
  filtraralmacenes = '';

  tableSizes = [3, 6, 9, 12];


  LengthTable = 0;
  sortedData;

  displayedColumns: string[] = ['Codigo', 'Nombre', 'Direccion', 'Principal' , 'Status', 'Acción'];
  dataSource: MatTableDataSource<Almacen>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private almacenServicio: AlmacenService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarAlmacenes();
  }

  listarAlmacenes(){
    this.loading = true;
    this.almacenServicio.listarAlmacenes('')
   .subscribe(response => {
        this.lstAlmacenes = response as Almacen[];
        this.dataSource = new MatTableDataSource(this.lstAlmacenes);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstAlmacenes.length;
        this.sortedData = this.lstAlmacenes.slice();
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

registraralmacenes() {
  this.router.navigate(['inventario/crearalmacen']);
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    compare(a, b, isAsc) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    sortData(sort: Sort) {
      const data = this.lstAlmacenes.slice();
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
  this.listarAlmacenes();
}
Importar(){

}
}
