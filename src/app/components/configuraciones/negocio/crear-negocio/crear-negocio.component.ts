import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Negocio } from 'src/app/components/model/Negocio.model';
import { NegocioService } from '../NegocioService.service';

@Component({
  selector: 'app-crear-negocio',
  templateUrl: './crear-negocio.component.html',
  styleUrls: ['./crear-negocio.component.css']
})
export class CrearNegocioComponent implements OnInit {

  formempresa: FormGroup;
  EmpresaModel: Negocio;
  loading = false;
  camposrequeridos: string;
  idempresa = 0;

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  patternombreydescripcion = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\#\%\$\-\_\*\/\&\"\°\¡\!\(\)]*$/;

  constructor(private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private formbuilder: FormBuilder,
              private negocioService: NegocioService) { 

    if (this.route.snapshot.params.id) {
      this.idempresa = this.route.snapshot.params.id;
    }
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    this.buildForm();

  }

  ngOnInit(): void {
  }

  private buildForm() {

    this.formempresa = this.formbuilder.group({
      codnegocio: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      nombre: ['', [Validators.required, Validators.pattern(this.patternombreydescripcion)]],
      direccion: ['', Validators.required],
      telefono: [''],
      creadoel: [new Date()],
      actualizadoel: [new Date()],
      cantidadusuario: [1,[Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      tiempocierresesion: [1,[Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
      web: [''],
      habilitado: [true, [Validators.required]]

    });
  }

  get tiempocierresesion() {
    return this.formempresa.get('tiempocierresesion');
  }

  get web() {
    return this.formempresa.get('web');
  }

  get cantidadusuario() {
    return this.formempresa.get('cantidadusuario');
  }

  get direccion() {
    return this.formempresa.get('direccion');
  }

  get codnegocio() {
    return this.formempresa.get('codnegocio');
  }

  get email() {
    return this.formempresa.get('email');
  }

  get telefono() {
    return this.formempresa.get('telefono');
  }


  get nombre() {
    return this.formempresa.get('nombre');
  }

  get habilitado() {
    return this.formempresa.get('habilitado');
  }

  onChange(event: MatSlideToggleChange) {
    this.formempresa.get('habilitado').setValue(event.checked === true ? true : false);
  }

  cargarRequeridos(e) {
    console.log('Mouse over');
    let i = 0;
    let valido = false;
    this.camposrequeridos = 'Valores Requeridos:\n';
    Object.keys(this.formempresa.controls).forEach(key => {

      if (this.formempresa.controls[key].invalid) {
        this.camposrequeridos += key + '\n';
      }
    });
  }

  guardarNegocio(event: Event) {
    event.preventDefault();
    if (this.formempresa.valid) {
      this.loading = true;
      const value = this.formempresa.value;
      this.negocioService.guardarEmpresa(this.idempresa, value)
        .subscribe(response => {

          this.loading = false;
          this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
          this.router.navigate(['/main/dashboard/configuraciones/listarempresas']);
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
    else {
      this.toastr.error('Opss faltan datos que son obligatorios ', 'Error', { enableHtml: true, closeButton: true });
    }
  }

}
