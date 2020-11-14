import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactoService } from '../ContactoService.service';
import { TipoIdentificacionService } from '../TipoIdentificacionService.service';

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
  
  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor(private contactoServicio: ContactoService,
    private tipoidentificacionServicio:TipoIdentificacionService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) { 
      this.buildForm();
    }

  ngOnInit(): void {
    this.listarTipoIdentificacion();
  }
  guardarContacto(event: Event){
    event.preventDefault();
    const value = this.formcontacto.value;
    console.log(value);
    this.contactoServicio.guardarContacto(this.id, value)
    .subscribe(response => {
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.router.navigate(['contactos/listarcontactos']);
      console.log(response);
    },
    ((error: HttpErrorResponse) => {
      this.loading = false;
      console.log('Error ' + error);
      this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio  ' + '<br>' + error.message, 'Error',
      { enableHtml: true, closeButton: true });
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
        console.log('Error ' + error);
        this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
        { enableHtml: true, closeButton: true });
      }));
  }

  private buildForm(){
    this.formcontacto = this.formbuilder.group({
      
      nombre: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      razonsocial: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      telefonomovil: ['', [Validators.required, Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofijo1: ['', [Validators.required, Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofijo2: ['', [Validators.required, Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofax: ['', [Validators.required, Validators.pattern(this.patten), Validators.maxLength(15)]],
      numeroidentificacion: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      direccionfiscal: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      correoe: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      regimeniva: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],  
      fecharegistro: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      codtipocontibuyente: [null, [Validators.required]],
      codtipocontacto: [null, [Validators.required]],
      codtipoidentificacion: [null, [Validators.required]],
      
      status: ['1', [Validators.required]]

    });
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
}
