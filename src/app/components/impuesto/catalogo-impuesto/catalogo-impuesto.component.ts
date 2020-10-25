import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Impuesto } from '../../model/Impuesto.model';
import { ImpuestoService } from '../ImpuestoService.service';

@Component({
  selector: 'app-catalogo-impuesto',
  templateUrl: './catalogo-impuesto.component.html',
  styleUrls: ['./catalogo-impuesto.component.css']
})
export class CatalogoImpuestoComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Impuestos';
  lstImpuestos: Impuesto[] = [];

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];
  
  constructor(private impuestoServicio: ImpuestoService,
    private router: Router) { }

  ngOnInit(): void {
    this.listarImpuestos();
  }
  listarImpuestos(){
    this.loading = true;
    this.impuestoServicio.listarImpuestos('')
   .subscribe(response => {
     this.lstImpuestos = response as Impuesto[];
     console.log(this.lstImpuestos);
     this.loading = false;
   });
 }
 onTableDataChange(event){
  this.page = event;
  this.lstImpuestos;
}  

onTableSizeChange(event): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.lstImpuestos;
} 
registrarimpuestos() {
  this.router.navigate(['ventas/crearimpuestos']);
    }

}

