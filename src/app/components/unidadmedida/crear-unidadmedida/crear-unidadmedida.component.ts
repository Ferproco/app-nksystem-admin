import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  constructor(private unidadServicio: UnidadService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService) { 
      this.buildForm();
    }

  ngOnInit(): void {
    
  }
  guardarUnidad(event: Event){
    event.preventDefault();
    const value = this.formunidad.value;
    console.log(value);

    this.toastr.info('Falta Informacion requerida', 'Informacion', { enableHtml: true, closeButton: true });
    this.unidadServicio.guardarUnidad(this.id, value)
    .subscribe(response => {
      console.log(response);
    });
  }

  
  private buildForm(){

    this.formunidad = this.formbuilder.group({
      abrevunidadmedida: ['', [Validators.required]],
      nomunidadmedida: ['', [Validators.required]],
      
    });
  }
}
