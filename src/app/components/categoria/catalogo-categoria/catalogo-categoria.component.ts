import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../../model/Categoria.model';
import { CategoriaService } from '../CategoriaService.service';

@Component({
  selector: 'app-catalogo-categoria',
  templateUrl: './catalogo-categoria.component.html',
  styleUrls: ['./catalogo-categoria.component.css']
})
export class CatalogoCategoriaComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Categorias';
  lstCategorias: Categoria[] = [];

  filtrarcategorias = '';

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];
  LengthTable = 0;

  constructor(private categoriaServicio: CategoriaService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias() {
    this.loading = true;
    this.categoriaServicio.listarCategorias('')
      .subscribe(response => {
        this.lstCategorias = response as Categoria[];
        this.LengthTable = this.lstCategorias.length;
        console.log(this.lstCategorias);
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


  registrarcategorias() {
    this.router.navigate(['inventario/crearcategoria']);
  }
}
