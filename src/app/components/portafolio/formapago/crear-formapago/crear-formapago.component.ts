import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormaPago } from 'src/app/components/model/FormaPago.model';
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
  operacion: string = 'GUARDAR';

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor( private formapagoService: FormaPagoService,
               private formbuilder: FormBuilder,
               private toastr: ToastrService,
               private router: Router,
               private route: ActivatedRoute) {

      this.idnegocio = 1;
      this.formapago = new FormaPago(0, '', 0, this.idnegocio, 1);
      if (this.route.snapshot.params.id){
        this.id = this.route.snapshot.params.id;
        this.buscarFormaPago(this.id);
        this.operacion = 'MODIFICAR';
      }


     }

  ngOnInit(): void {
    this.buildForm(this.formapago);
  }

  public buildForm(formapago: FormaPago){
    this.formformapago = this.formbuilder.group({
      id: [formapago.id, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      nombre: [formapago.nombre, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      dias: [formapago.dias, [Validators.required, Validators.pattern(this.paterhombre)]],
      status: [formapago.status, [Validators.required]]
    });
  }

  buscarFormaPago(id: number) {
    let status = 0;
    this.loading = true;
    const obj = this.formapagoService.mostrarFormaPago(id)
      .subscribe(response => {
        const forma = response as any;
        if (forma.status === 'ACTIVO') {
          status = 1;
        }
        else {
          status = 0;
        }
        forma.status = status;
        this.formapago = new FormaPago(forma.id, forma.nombre, forma.dias, this.idnegocio, status);
        this.buildForm(this.formapago);
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

  }

  guardarFormaPago(event: Event){
    event.preventDefault();
    const value = this.formformapago.value;
    console.log(value);
    this.formapagoService.guardarFormaPago(this.id, this.idnegocio, value, this.operacion)
    .subscribe(response => {
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.router.navigate(['/main/dashboard/portafolio/listarformaspagos']);
    },
    ((error: HttpErrorResponse) => {
      this.loading = false;
      console.log('Error ' + JSON.stringify(error));
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
  onChange($event) {
    console.log($event.target.checked + ' esto es lo que se chequeo');
    this.formformapago.get('status').setValue($event.target.checked === true ? 1 : 0);
  }
}
