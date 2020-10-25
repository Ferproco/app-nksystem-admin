import { Component, OnInit } from '@angular/core';
import { Factura } from '../../model/Factura.model';
import { FacturaService } from '../FacturaService.service';

@Component({
  selector: 'app-catalogo-factura',
  templateUrl: './catalogo-factura.component.html',
  styleUrls: ['./catalogo-factura.component.css']
})
export class CatalogoFacturaComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Facturas';
  lstFacturas: Factura[] = [];
  constructor(private facturaService:FacturaService) { }

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  ngOnInit(): void {
    this.listarFacturas();
  }

  listarFacturas(){
    this.loading = true;
    this.facturaService.listarFacturas('')
   .subscribe(response => {
     this.lstFacturas = response as Factura[];
     console.log(this.lstFacturas);
     this.loading = false;
   });
 }

 onTableDataChange(event){
  this.page = event;
  this.lstFacturas;
}  

onTableSizeChange(event): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.lstFacturas;
} 

}
