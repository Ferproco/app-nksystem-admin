import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../model/Proveedor.model';
import { ProveedorService } from '../ProveedorService.service';


@Component({
  selector: 'app-catalogo-proveedor',
  templateUrl: './catalogo-proveedor.component.html',
  styleUrls: ['./catalogo-proveedor.component.css']
})
export class CatalogoProveedorComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Proveedores';
  lstProveedores: Proveedor[] = [];

  constructor(private proveedorService:ProveedorService) { }

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];
  ngOnInit(): void {
    this.listarProveedores();
  }

  listarProveedores(){
    this.loading = true;
    this.proveedorService.listarProveedores('')
   .subscribe(response => {
     this.lstProveedores = response as Proveedor[];
     console.log(this.lstProveedores);
     this.loading = false;
   });
 }
 onTableDataChange(event){
  this.page = event;
  this.lstProveedores;
}  

onTableSizeChange(event): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.lstProveedores;
} 


}
