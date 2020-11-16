import { FormaPagoService } from './../../formapago/FormaPagoService.service';
import { TipoContribuyenteService } from './TipoContribuyenteService.service';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactoService } from '../ContactoService.service';
import { TipoIdentificacionService } from './TipoIdentificacionService.service';
import { VendedorService } from '../../vendedor/VendedorService.service';

@Component({
  selector: 'app-crear-contacto',
  templateUrl: './crear-contacto.component.html',
  styleUrls: ['./crear-contacto.component.css']
})
export class CrearContactoComponent implements OnInit {
  id = 0;

  loading = false;
  formcontacto: FormGroup;
  lstTipoIdentificacion: any [] = [];
  lstTipoContribuyente: any [] = [];
  lstVendedores: any [] = [];
  lstformaspago: any [] = [];
  idnegocio: number;

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor(private contactoServicio: ContactoService,
              private tipoidentificacionServicio: TipoIdentificacionService,
              private tipocontribuyenteServicio: TipoContribuyenteService,
              private formaPagoService: FormaPagoService,
              private vendedorService: VendedorService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {
      this.buildForm();
      this.idnegocio = 1;
    }

  ngOnInit(): void {
    this.listarTipoIdentificacion();
    this.listarTipoContribuyente();
    this. listarVendedores();
    this.listarFormasdepago();

  }

  guardarContacto(event: Event){
    event.preventDefault();
    this.loading = true;
    const value = this.formcontacto.value;
    this.contactoServicio.guardarContacto(this.id, this.idnegocio, value)
    .subscribe(response => {
      this.loading = false;
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.router.navigate(['contactos/listarcontactos']);
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

  listarTipoIdentificacion() {
    this.loading = true;
    this.tipoidentificacionServicio.listarTipoIdentificaciones('')
      .subscribe(response => {
        this.lstTipoIdentificacion = response as any[];
        console.log(this.lstTipoIdentificacion);
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

  listarTipoContribuyente() {
    this.loading = true;
    this.tipocontribuyenteServicio.listarTipoContribuyente('')
      .subscribe(response => {
        this.lstTipoContribuyente = response as any[];
        console.log(this.lstTipoContribuyente);
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

  listarVendedores() {
    this.loading = true;
    this.vendedorService.listarVendedores('')
      .subscribe(response => {
        this.lstVendedores = response as any[];
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

  listarFormasdepago() {
    this.loading = true;
    this.formaPagoService.listarFormaPagos('')
      .subscribe(response => {
        this.lstformaspago = response as any[];
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
    this.formcontacto = this.formbuilder.group({
      codtipocontibuyente: [null, [Validators.required]],
      codtipoidentificacion: [null, [Validators.required]],
      numeroidentificacion: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      nombre: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      razonsocial: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      telefonomovil: ['', [Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofijo1: ['', [Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofijo2: ['', [Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofax: ['', [Validators.pattern(this.patten), Validators.maxLength(15)]],
      direccionfiscal: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      correoe: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      fecharegistro: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      codtipocontacto: [0, [Validators.required]],
      codvendedor: [0, [Validators.required]],
      codformapago: [0, [Validators.required]],
      status: ['1', [Validators.required]]
    });
  }

  get codtipocontibuyente(){
    return this.formcontacto.get('codtipocontibuyente');
  }
  get nombre() {
    return this.formcontacto.get('nombre');
  }
  get numeroidentificacion() {
    return this.formcontacto.get('numeroidentificacion');
  }
  get direccionfiscal() {
    return this.formcontacto.get('direccionfiscal');
  }
  get telefonofijo1() {
    return this.formcontacto.get('telefonofijo1');
  }
  get telefonofijo2() {
    return this.formcontacto.get('telefonofijo2');
  }
  get telefonofax() {
    return this.formcontacto.get('telefonofax');
  }
  get telefonomovil() {
    return this.formcontacto.get('telefonomovil');
  }
  get correoe(){
    return this.formcontacto.get('correoe');
  }
  get razonsocial(){
    return this.formcontacto.get('razonsocial');
  }
}
