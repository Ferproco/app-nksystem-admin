import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from '../../model/Contacto.model';
import { ContactoService } from '../ContactoService.service';

@Component({
  selector: 'app-catalogo-contactos',
  templateUrl: './catalogo-contactos.component.html',
  styleUrls: ['./catalogo-contactos.component.css']
})
export class CatalogoContactosComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Contactos';
  lstContactos: Contacto[] = [];
  sortedData;
  LengthTable = 0;

  displayedColumns: string[] = ['Tipo Identificacion', 'N° Identificacion', 'Nombre', 'Telefono' , 'Email', 'Status', 'Acción'];
  dataSource: MatTableDataSource<Contacto>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private contactoServicio: ContactoService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  private listarContactos(): void {
    this.loading = true;
    console.log('entro aqui');
    this.contactoServicio.listarContactos('')
      .subscribe(response => {
        console.log('result ' + response);
        this.lstContactos = response as Contacto[];
        this.dataSource = new MatTableDataSource(this.lstContactos);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstContactos.length;
        this.sortedData = this.lstContactos.slice();
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


  registrarcontactos() {
    this.router.navigate(['contactos/crearcontacto']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.lstContactos.slice();
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
    this.listarContactos();
  }
  Importar(){

  }


}
