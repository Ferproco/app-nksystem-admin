import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormaPagoService } from '../FormaPagoService.service';

@Component({
  selector: 'app-crear-formapago',
  templateUrl: './crear-formapago.component.html',
  styleUrls: ['./crear-formapago.component.css']
})
export class CrearFormapagoComponent implements OnInit {

  id = 0;
  loading = false;
  formformapago: FormGroup;
  idnegocio:number;

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor( private formapagoService: FormaPagoService,
               private formbuilder: FormBuilder,
               private toastr: ToastrService,
               private router: Router) {

      this.buildForm();
      this.idnegocio=1;
     }

  ngOnInit(): void {
  }
  guardarFormaPago(event: Event){
    event.preventDefault();
    const value = this.formapagoService.value;
    console.log(value);
    this.formapagoService.guardarFormaPago(this.id,this.idnegocio, value)
    .subscribe(response => {
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.router.navigate(['configuracion/listarformaspagos']);
      console.log(response);
    },
    ((error: HttpErrorResponse) => {
      this.loading = false;
      console.log('Error ' + error);
      this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio  ' + '<br>' + error.message, 'Error',
      { enableHtml: true, closeButton: true });
    }));
  }

  
  private buildForm(){
    this.formformapago = this.formbuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      dias: ['0', [Validators.required, Validators.pattern(this.paterhombre)]],
     
      status: ['1', [Validators.required]]

    });
  }

  get nombre() {
    return this.formformapago.get('nombre');
  }
  get dias() {
    return this.formformapago.get('dias');
  }

  get status() {
    return this.formformapago.get('status');
  }
}
