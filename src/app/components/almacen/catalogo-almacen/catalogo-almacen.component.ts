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
     console.log(this.lstAlmacenes);
     this.loading = false;
   },
   error => {
     this.loading = false;
     this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
     { enableHtml: true, closeButton: true });
   });
 }
 onTableDataChange(event){
  this.page = event;
  this.lstAlmacenes;
}

onTableSizeChange(event): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.lstAlmacenes;
}
registraralmacenes() {
  this.router.navigate(['inventario/crearinventario']);
    }
}
