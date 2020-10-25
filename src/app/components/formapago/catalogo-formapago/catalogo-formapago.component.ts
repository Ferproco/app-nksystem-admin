import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormaPago } from '../../model/FormaPago.model';
import { FormaPagoService } from '../FormaPagoService.service';

@Component({
  selector: 'app-catalogo-formapago',
  templateUrl: './catalogo-formapago.component.html',
  styleUrls: ['./catalogo-formapago.component.css']
})
export class CatalogoFormapagoComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Forma Pagos';
  lstFormaPagos: FormaPago[] = [];

  filtrarformapago = '';

  constructor(private formaPagoService: FormaPagoService,
              private toastr: ToastrService) { }

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  ngOnInit(): void {
    this.listarFormaPagos();
  }

  listarFormaPagos(){
    this.loading = true;
    this.formaPagoService.listarFormaPagos('')
   .subscribe(response => {
     this.lstFormaPagos = response as FormaPago[];
     console.log(this.lstFormaPagos);
     this.loading = false;
   },
   error => {
     this.loading = false;
     this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
     { enableHtml: true, closeButton: true });
   });
 }

 registrarformapago(){

 }

 onTableDataChange(event){
  this.page = event;
  this.lstFormaPagos;
}

onTableSizeChange(event): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.lstFormaPagos;
}

}
