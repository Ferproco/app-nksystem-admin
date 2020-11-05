import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnidadMedida } from '../../model/UnidadMedida.model';
import { UnidadService } from '../UnidadService.service';

@Component({
  selector: 'app-catalogo-unidadmedida',
  templateUrl: './catalogo-unidadmedida.component.html',
  styleUrls: ['./catalogo-unidadmedida.component.css']
})
export class CatalogoUnidadmedidaComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Unidades';
  lstUnidades: UnidadMedida[] = [];
  filtrarunidades = '';


  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];
  constructor(private unidadServicio: UnidadService,
    private router: Router , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarUnidades();
  }

  listarUnidades(){
    this.loading = true;
    this.unidadServicio.listarUnidades('')
   .subscribe(response => {
     this.lstUnidades = response as UnidadMedida[];
     console.log(this.lstUnidades);
     this.loading = false;
   });
 }
 onTableDataChange(event){
  this.page = event;
  this.lstUnidades;
}

onTableSizeChange(event): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.lstUnidades;
}
registrarunidades() {
  this.router.navigate(['inventario/listarunidades']);
    }
}
