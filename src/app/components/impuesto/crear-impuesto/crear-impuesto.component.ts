import { TipoImpuesto } from './../../model/TipoImpuesto.model';
import { ImpuestoService } from './../ImpuestoService.service';
import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TipoImpuestoService } from '../TipoImpuestoService.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-crear-impuesto',
  templateUrl: './crear-impuesto.component.html',
  styleUrls: ['./crear-impuesto.component.css']
})
export class CrearImpuestoComponent implements OnInit {

  idimpuesto = 0;
  lstTipoImpuestos: any [] = [];
  loading = false;
  formimpuesto: FormGroup;
  idnegocio: number;

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor(private tipoimpuestoServicio: TipoImpuestoService,
              private impuestoService: ImpuestoService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {

    this.buildForm();
    this.idnegocio = 1;
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
  }

  ngOnInit(): void {
    this.listarTipoImpuestos();
  }

  guardarImpuesto(event: Event){
    event.preventDefault();
    this.loading = true;
    const value = this.formimpuesto.value;
    this.impuestoService.guardarImpuesto(this.idimpuesto, this.idnegocio, value)
    .subscribe(response => {
      this.loading = false;
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.router.navigate(['configuracion/listarimpuestos']);
    },
    ((error: HttpErrorResponse) => {
      this.loading = false;
      console.log('Error ' + error);
      this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio  ' + '<br>' + error.message, 'Error',
      { enableHtml: true, closeButton: true });
    }));
  }

  listarTipoImpuestos() {
    this.loading = true;
    this.tipoimpuestoServicio.listarTipoImpuestos('')
      .subscribe(response => {
        this.lstTipoImpuestos = response as any[];
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

  private buildForm(){
    this.formimpuesto = this.formbuilder.group({
      nombreimpuesto: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      normal: ['0', [Validators.required, Validators.pattern(this.paterhombre)]],
      fechaini: [new Date(this.currentDate.setDate(this.currentDate.getDate())), [Validators.required]],
      idtipoimpuesto: [null, [Validators.required]],
      status: ['1', [Validators.required]]

    });
  }

  get normal() {
    return this.formimpuesto.get('normal');
  }
  get nombreimpuesto() {
    return this.formimpuesto.get('nombreimpuesto');
  }

}
