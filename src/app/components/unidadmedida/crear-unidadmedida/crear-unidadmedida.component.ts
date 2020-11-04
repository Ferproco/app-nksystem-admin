import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnidadService } from '../UnidadService.service';

@Component({
  selector: 'app-crear-unidadmedida',
  templateUrl: './crear-unidadmedida.component.html',
  styleUrls: ['./crear-unidadmedida.component.css']
})
export class CrearUnidadmedidaComponent implements OnInit {

  id = 0;
  lstUnidades: any [] = [];
  loading = false;
  formunidad: FormGroup;

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;


  constructor(private unidadServicio: UnidadService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router) { 
      this.buildForm();
    }

  ngOnInit(): void {
    
  }
  guardarUnidad(event: Event){
    event.preventDefault();
    const value = this.formunidad.value;
    console.log(value);
    this.unidadServicio.guardarUnidad(this.id, value)
    .subscribe(response => {
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.router.navigate(['inventario/listarunidades']);
      console.log(response);
    },
    error => {
      this.loading = false;
      this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
    { enableHtml: true, closeButton: true });
    });
  }

  
  private buildForm(){

    this.formunidad = this.formbuilder.group({
     
       abrevunidadmedida: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
       nomunidadmedida: ['', [Validators.required]],
    });
  }

  

  get abrevunidadmedida() {
    return this.formunidad.get('abrevunidadmedida');
  }
  get nomunidadmedida() {
    return this.formunidad.get('nomunidadmedida');
  }
}
