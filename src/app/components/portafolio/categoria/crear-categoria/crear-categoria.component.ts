import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../CategoriaService.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {
  id = 0;

  loading = false;
  formcategoria: FormGroup;
  idnegocio: number;

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor(private categoriaService: CategoriaService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

    this.buildForm();
    this.idnegocio = 1;
  }

  ngOnInit(): void {
  }

  guardarCategoria(event: Event) {
    event.preventDefault();
    this.loading = true;
    const value = this.formcategoria.value;
    this.categoriaService.guardarCategoria(this.id, this.idnegocio, value)
      .subscribe(response => {
        this.loading = false;
        this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
        this.router.navigate(['inventario/listarcategorias']);
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          console.log('Error ' + error);
          this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio  ' + '<br>' + error.message, 'Error',
            { enableHtml: true, closeButton: true });
        }));
  }


  private buildForm() {
    this.formcategoria = this.formbuilder.group({
      nomfamilia: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      status: ['1', [Validators.required]]

    });
  }

  get nomfamilia() {
    return this.formcategoria.get('nomfamilia');
  }

}
