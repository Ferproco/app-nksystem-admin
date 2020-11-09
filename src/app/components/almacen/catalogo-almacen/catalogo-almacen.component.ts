import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Almacen } from '../../model/Almacen.model';
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
  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];
  LengthTable = 0;

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
     this.LengthTable = this.lstAlmacenes.length;
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

registraralmacenes() {
  this.router.navigate(['inventario/crearalmacen']);
    }
}
