import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlmacenService } from '../AlmacenService.service';

@Component({
  selector: 'app-crear-almacen',
  templateUrl: './crear-almacen.component.html',
  styleUrls: ['./crear-almacen.component.css']
})

export class CrearAlmacenComponent implements OnInit {
  id = 0;
  lstAlmacenes: any [] = [];
  loading = false;
  formalmacen: FormGroup;

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor(private almacenServicio: AlmacenService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {
      this.buildForm();
    }

  ngOnInit(): void {
  }

  guardarAlmacen(event: Event) {
    event.preventDefault();
    const value = this.formalmacen.value;
    console.log(value);

    this.almacenServicio.guardarAlmacen(this.id, value)
      .subscribe(response => {
        this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
        this.router.navigate(['inventario/listaralmacenes']);
        console.log(response);
      },
        error => {
          this.loading = false;
          this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
            { enableHtml: true, closeButton: true });
        });
  }

  private buildForm() {

    this.formalmacen = this.formbuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      direccion: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      principal: ['1', [Validators.required]],
      status: ['1', [Validators.required]]

    });
  }

  get nombre() {
    return this.formalmacen.get('nombre');
  }

  get direccion() {
    return this.formalmacen.get('direccion');
  }

}
