import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];
  LengthTable = 0;
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
        this.LengthTable = this.lstContactos.length;
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


}
