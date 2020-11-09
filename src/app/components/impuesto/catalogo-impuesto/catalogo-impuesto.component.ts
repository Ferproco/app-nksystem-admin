import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  LengthTable = 0;

  constructor(private impuestoServicio: ImpuestoService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarImpuestos();
  }

  private listarImpuestos(): void {
    this.loading = true;
    console.log('entro aqui');
    this.impuestoServicio.listarImpuestos('')
      .subscribe(response => {
        console.log('result ' + response);
        this.lstImpuestos = response as Impuesto[];
        this.LengthTable = this.lstImpuestos.length;
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


  registrarimpuestos() {
    this.router.navigate(['configuracion/crearimpuestos']);
  }

}

