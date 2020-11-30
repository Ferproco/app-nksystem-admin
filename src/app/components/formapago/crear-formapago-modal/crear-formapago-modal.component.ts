import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormaPago } from '../../model/FormaPago.model';
import { FormaPagoService } from '../FormaPagoService.service';

@Component({
  selector: 'app-crear-formapago-modal',
  templateUrl: './crear-formapago-modal.component.html',
  styleUrls: ['./crear-formapago-modal.component.css']
})


export class CrearFormapagoModalComponent implements OnInit {
  public onClose: Subject<boolean>;

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
  constructor(private bsModalRef: BsModalRef,
              private formapagoService: FormaPagoService,
               private formbuilder: FormBuilder,
               private toastr: ToastrService,
               private router: Router,
               private route: ActivatedRoute) {

                this.idnegocio = 1;
                this.formapago = new FormaPago(0, '', 0, this.idnegocio, 1);
                
                }

  ngOnInit(): void {
    this.buildForm(this.formapago);
    this.onClose = new Subject();
  }

  public buildForm(formapago: FormaPago){
    this.formformapago = this.formbuilder.group({
      id: [formapago.id, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      nombre: [formapago.nombre, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      dias: [formapago.dias, [Validators.required, Validators.pattern(this.paterhombre)]],
      status: [formapago.status, [Validators.required]]
    });
  }

  public onConfirm(): void {
    const value = this.formformapago.value;
    console.log(value);
    this.formapagoService.guardarFormaPago(this.id, this.idnegocio, value, this.operacion)
    .subscribe(response => {
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.onClose.next(true);
      this.bsModalRef.hide();
    },
    ((error: HttpErrorResponse) => {
      this.loading = false;
      console.log('Error ' + JSON.stringify(error));
      this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio  ' + '<br>' + error.message, 'Error',
      { enableHtml: true, closeButton: true });
    }));
   
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
  guardarFormaPago(event: Event){
    event.preventDefault();
    const value = this.formformapago.value;
    console.log(value);
    this.formapagoService.guardarFormaPago(this.id, this.idnegocio, value, this.operacion)
    .subscribe(response => {
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.onClose.next(true);
      this.bsModalRef.hide();
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
