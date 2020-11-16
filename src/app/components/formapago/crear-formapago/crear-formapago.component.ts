import { FormaPago } from './../../model/FormaPago.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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

  /*
  VARIABLE DE ENTRADA QUE SE LA PASA EL CATALOGO PARA BUSCAR LA FORMA DE PAGO
  */

  id = 0;
  loading = false;
  formformapago: FormGroup;
  idnegocio: number;
  formapago: FormaPago;

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor( private formapagoService: FormaPagoService,
               private formbuilder: FormBuilder,
               private toastr: ToastrService,
               private router: Router) {
      this.buildForm();
      this.idnegocio = 1;


     }

  ngOnInit(): void {

    this.formapagoService.idformapago.subscribe(
      (id: number) => this.buscarFormaPago(id)
    );

  }

  public buildForm(){

    this.formformapago = this.formbuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      dias: ['0', [Validators.required, Validators.pattern(this.paterhombre)]],
      status: ['1', [Validators.required]]

    });
  }

  buscarFormaPago(id: number) {

    this.loading = true;
    const obj = this.formapagoService.mostrarFormaPago(id)
      .subscribe(response => {
        console.log(JSON.stringify(response));
        this.formapago = response as FormaPago;
        const nombre = this.formapago.nombre;
        console.log('el nombre ' + nombre);
        this.formformapago.controls.nombre.setValue(response);
        this.formformapago.get('dias').setValue(this.formapago.dias);
        this.loading = false;

      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 404) {

          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
        }));


    /*
    console.log(this.formapago.nombre + ' nombre forma ' + ' y trae ' + this.formformapago.get('nombre').value);*/
  }

  guardarFormaPago(event: Event){
    event.preventDefault();
    const value = this.formformapago.value;
    console.log(value);
    this.formapagoService.guardarFormaPago(this.id, this.idnegocio, value)
    .subscribe(response => {
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.router.navigate(['configuracion/listarformaspagos']);
    },
    ((error: HttpErrorResponse) => {
      this.loading = false;
      console.log('Error ' + error);
      this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio  ' + '<br>' + error.message, 'Error',
      { enableHtml: true, closeButton: true });
    }));
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
