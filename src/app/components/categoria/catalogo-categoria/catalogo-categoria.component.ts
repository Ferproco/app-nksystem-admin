import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../../model/Categoria.model';
import { CategoriaService } from '../CategoriaService.service';

@Component({
  selector: 'app-catalogo-categoria',
  templateUrl: './catalogo-categoria.component.html',
  styleUrls: ['./catalogo-categoria.component.css']
})
export class CatalogoCategoriaComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Almacenes';
  lstCategorias: Categoria[] = [];
  filtrarcategorias = '';
  
  tableSizes = [3, 6, 9, 12];
  

  LengthTable = 0;
  sortedData;

  displayedColumns: string[] = ['Codigo', 'Nombre', 'Status', 'Acción'];
  dataSource: MatTableDataSource<Categoria>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private categoriaServicio: CategoriaService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias() {
    this.loading = true;
    this.categoriaServicio.listarCategorias('')
   .subscribe(response => {
        this.lstCategorias = response as Categoria[];
        this.dataSource = new MatTableDataSource(this.lstCategorias);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstCategorias.length;
        this.sortedData = this.lstCategorias.slice();
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


  registrarcategorias() {
    this.router.navigate(['inventario/crearcategoria']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.lstCategorias.slice();
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
this.listarCategorias();
}
Importar(){

}
}
