import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AlmacenService } from '../../almacen/AlmacenService.service';
import { CrearAlmacenModalComponent } from '../../almacen/crear-almacen-modal/crear-almacen-modal.component';
import { FamiliaService } from '../../familia/FamiliaService.service';
import { GrupoArticuloService } from '../../grupoarticulo/GrupoArticuloService.service';
import { ImpuestoService } from '../../impuesto/ImpuestoService.service';
import { MarcaService } from '../../marca/MarcaService.service';
import { UnidadService } from '../../unidadmedida/UnidadService.service';
import { ArticuloService } from '../ArticuloService.service';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {

  id = 0;
  loading = false;
  lstFamilias: any [] = [];
  lstUnidades: any [] = [];
  lstImpuestos: any [] = [];
  lstMarcas: any[]=[];
  lstAlmacenes: any[]=[];
  lstGrupoArticulos:any[]=[];
  
  idnegocio: number;
  formarticulo: FormGroup;

  unidadmedidaxdefecto:2;
  bsModalRef: any;
  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;
  
  visiblecostoxproducto = false;
  visiblecantidad= false;
  visiblecantidadminima=false;
  visiblecantidadmaxima=false;
  visiblebodega=false;

  constructor(private articuloservice:ArticuloService,
              private familiaserive: FamiliaService,
              private unidadservice: UnidadService,
              private impuestoservice:ImpuestoService,
              private marcaservice:MarcaService,
              private grupoarticuloservice:GrupoArticuloService,
              private almacenServicio:AlmacenService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private modalService: BsModalService) {

    this.buildForm();
    this.idnegocio = 1;
   }

  ngOnInit(): void {
    this.listarFamilias();
    this.listarUnidades();
    this.listarImpuestos();
    this.listarMarcas();
    this.listarGrupoArticulos();
    this.listarBodegas();
  }

  private buildForm(){
   
    this.formarticulo = this.formbuilder.group({
      codigo: ['',[Validators.required]],
      nomarticulo:['',[Validators.required]],
      tipoproducto: [1,[Validators.required]],
      codmarca:[0,[Validators.required]],
      codfamilia:[0,[Validators.required]],
      codunidadmedida: [this.unidadmedidaxdefecto,[Validators.required]],
      codimpuesto:[0,[Validators.required]],
      preciosugerido:[0],
      referencia:[''],
      serial:[''],
      codigobarraprincipal:[''],
      descripcionlarga:[''],
      codbodega:[0],
      
    })
  }

  guardarArticulo(event: Event){
    event.preventDefault();
    this.loading = true;
    const value = this.formarticulo.value;
    this.articuloservice.guardarArticulo(this.id, this.idnegocio, value)
    .subscribe(response => {
      this.loading = false;
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.router.navigate(['inventario/listararticulos']);
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

  listarFamilias(){
    this.loading = true;
    this.familiaserive.listarFamilias('')
      .subscribe(response => {
        this.lstFamilias = response as any[];
        console.log(this.lstFamilias);
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

  listarBodegas(){
    this.loading = true;
    this.almacenServicio.listarAlmacenes('')
      .subscribe(response => {
        this.lstAlmacenes = response as any[];
        console.log(this.lstAlmacenes);
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

  listarUnidades(){
    this.loading = true;
    this.unidadservice.listarUnidades('')
      .subscribe(response => {
        this.lstUnidades = response as any[];
        console.log(this.lstUnidades);
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
  listarImpuestos(){
    this.loading = true;
    this.impuestoservice.listarImpuestos('')
      .subscribe(response => {
        this.lstImpuestos = response as any[];
        console.log(this.lstImpuestos);
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
  listarMarcas(){
    this.loading = true;
    this.marcaservice.listarMarcas('')
      .subscribe(response => {
        this.lstMarcas = response as any[];
        console.log(this.lstMarcas);
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
  listarGrupoArticulos(){
    this.loading = true;
    this.grupoarticuloservice.listarGrupoArticulos('')
      .subscribe(response => {
        this.lstGrupoArticulos = response as any[];
        console.log(this.lstGrupoArticulos);
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

  MostrarCamposTipoProducto(event){
    const idtipo = Number(event);
    if (idtipo === 1){
      this.visiblecostoxproducto = true;
      this.visiblecantidad= true;
      this.visiblecantidadminima=true;
      this.visiblecantidadmaxima=true;
      this.visiblebodega=true;
     

    }
    else if (idtipo === 2){

      this.visiblecostoxproducto = false;
      this.visiblecantidad= false;
      this.visiblecantidadminima=false;
      this.visiblecantidadmaxima=false;
      this.visiblebodega=false;
    }
  
  }
  onCrearBodega(){
    this.bsModalRef = this.modalService.show(CrearAlmacenModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result){
        this.listarBodegas();
      }
      console.log('results', result);

    });
  }
  get codigo(){
    return this.formarticulo.get('codigo');
  }
  get nomarticulo(){
    return this.formarticulo.get('nomarticulo');
  }
  get referencia(){
    return this.formarticulo.get('referencia');
  }
  get serial(){
    return this.formarticulo.get('serial');
  }
  get codigobarraprincipal(){
    return this.formarticulo.get('codigobarraprincipal');
  }
  
  get descripcionlarga(){
    return this.formarticulo.get('descripcionlarga');
  }
  get preciosugerido(){
    return this.formarticulo.get('preciosugerido');
  }
}
