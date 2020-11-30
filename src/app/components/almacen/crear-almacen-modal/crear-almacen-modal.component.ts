import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Almacen } from '../../model/Almacen.model';
import { AlmacenService } from '../AlmacenService.service';

@Component({
  selector: 'app-crear-almacen-modal',
  templateUrl: './crear-almacen-modal.component.html',
  styleUrls: ['./crear-almacen-modal.component.css']
})
export class CrearAlmacenModalComponent implements OnInit {

  public onClose: Subject<boolean>;
  id = 0;
  lstAlmacenes: any [] = [];
  loading = false;
  formalmacen: FormGroup;
  idnegocio: number;
  bodega: Almacen;
  operacion: string = 'GUARDAR';

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor(private bsModalRef: BsModalRef,
              private almacenServicio:AlmacenService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
                this.idnegocio = 1;
               }

  ngOnInit(): void {
    this.buildForm();
    this.onClose = new Subject();
  }
  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
  onChange($event) {
    console.log($event.target.checked + ' esto es lo que se chequeo');
    this.formalmacen.get('status').setValue($event.target.checked === true ? 1 : 0);
  }
  guardarAlmacen(event: Event){
    event.preventDefault();
    const value = this.formalmacen.value;
    console.log(value);

    this.almacenServicio.guardarAlmacen(this.id, value)
    .subscribe(response => {
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.router.navigate(['inventario/listaralmacenes']);
      console.log(response);
    },
    error => {
      this.loading = false;
      this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
    { enableHtml: true, closeButton: true });
    });
  }
  private buildForm(){
   
    
    this.formalmacen = this.formbuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      direccion: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      principal:['1',[Validators.required]],
      status: ['1', [Validators.required]]

    });
  }

  public onConfirm(): void {
    const value = this.formalmacen.value;
    console.log(value);
    this.almacenServicio.guardarAlmacen(this.id, value)
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
    return this.formalmacen.get('nombre');
  }
  get direccion() {
    return this.formalmacen.get('direccion');
  }

}
