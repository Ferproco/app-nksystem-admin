import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AlmacenService } from '../../almacen/AlmacenService.service';
import { CrearAlmacenModalComponent } from '../../almacen/crear-almacen-modal/crear-almacen-modal.component';
import { FamiliaService } from '../../familia/FamiliaService.service';
import { GrupoArticuloService } from '../../grupoarticulo/GrupoArticuloService.service';
import { ImpuestoService } from '../../impuesto/ImpuestoService.service';
import { MarcaService } from '../../marca/MarcaService.service';
import { Articulo } from '../../model/Articulo.model';
import { UnidadService } from '../../unidadmedida/UnidadService.service';
import { ArticuloService } from '../ArticuloService.service';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {

  radioModel = 'Middle';
  uncheckableRadioModel = 'Middle';

  camposrequeridos: string;

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

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

  ArticuloModel: Articulo;
  unidadmedidaxdefecto:2;
  bsModalRef: any;
  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  customClass = 'customClass';
  isFirstOpen = true;
  
  visiblecostoxproducto = false;
  visiblecantidad= false;
  visiblecantidadminima=false;
  visiblecantidadmaxima=false;
  visiblepuntoreorden=false;
  visiblebodega=false;

 
  codtipoproducto = [
    { id: 1, nombre: 'Producto' },
    { id: 2, nombre: 'Servicio' },
    { id: 3, nombre: 'Materia Prima' },
    { id: 4, nombre: 'Gastos' },
  ];
  constructor(private articuloservice:ArticuloService,
              private familiaserive: FamiliaService,
              private unidadservice: UnidadService,
              private impuestoservice:ImpuestoService,
              private marcaservice:MarcaService,
              private grupoarticuloservice:GrupoArticuloService,
              private almacenServicio:AlmacenService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: BsModalService) {

                this.ArticuloModel = new Articulo();
                this.idnegocio = 1;
              
                this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
                if (this.route.snapshot.params.id){
                  this.id = this.route.snapshot.params.id;
                  this.buscarArticulo(this.id);
                }
    this.buildForm();
    
   }

  ngOnInit(): void {
    this.listarFamilias();
    this.listarUnidades();
    this.listarImpuestos();
    this.listarMarcas();
   // this.listarGrupoArticulos();
   // this.listarBodegas();
  }

  private buildForm(){
      
      this.formarticulo = this.formbuilder.group({
      codigo: [this.ArticuloModel.codigo,[Validators.required]],
      nomarticulo:[this.ArticuloModel.nomarticulo,[Validators.required]],
      codtipoproducto: [this.ArticuloModel.codtipoproducto,[Validators.required]],
      codfamilia:[this.ArticuloModel.codfamilia,[Validators.required]],
      codunidadmedida: [this.ArticuloModel.codunidadmedida,[Validators.required]],
      codimpuesto:[this.ArticuloModel.codimpuesto,[Validators.required]],
      codmarca:[this.ArticuloModel.codmarca,[Validators.required]],
      preciosugerido:[this.ArticuloModel.preciosugerido, [Validators.pattern(this.parrterobservaciones)]],
      referencia:[this.ArticuloModel.referencia, [Validators.pattern(this.parrterobservaciones)]],
      serial:[this.ArticuloModel.serial, [Validators.pattern(this.parrterobservaciones)]],
      codigobarraprincipal:[this.ArticuloModel.codigobarraprincipal, [Validators.pattern(this.parrterobservaciones)]],
      descripcionlarga:[this.ArticuloModel.descripcionlarga, [Validators.pattern(this.parrterobservaciones)]],
      status: [this.ArticuloModel.status === 'ACTIVO' ? 1 : 0],
      stockminimo:[this.ArticuloModel.stockminimo, [Validators.pattern(this.parrterobservaciones)]],
      stockmaximo:[this.ArticuloModel.stockmaximo, [Validators.pattern(this.parrterobservaciones)]],
      cantidadreorden:[this.ArticuloModel.cantidadreorden, [Validators.pattern(this.parrterobservaciones)]],
      peso:[this.ArticuloModel.peso, [Validators.pattern(this.parrterobservaciones)]],
      talla:[this.ArticuloModel.talla, [Validators.pattern(this.parrterobservaciones)]],
      color:[this.ArticuloModel.color, [Validators.pattern(this.parrterobservaciones)]]
     // codbodega::[this.ArticuloModel.listabodegas.co]
      
      
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
     this.visiblepuntoreorden=true;
      this.visiblebodega=true;
     

    }
    else if (idtipo === 2){

      this.visiblecostoxproducto = false;
      this.visiblecantidad= false;
      this.visiblecantidadminima=false;
      this.visiblecantidadmaxima=false;
      this.visiblebodega=false;
      this.visiblepuntoreorden=false;
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

  buscarArticulo(id: number) {
    let status = 0;
    this.loading = true;
    const obj = this.articuloservice.mostrarArticulo(id)
      .subscribe(response => {
        this.ArticuloModel = response as any;
        if (this.ArticuloModel.status === 'ACTIVO') {
          status = 1;
        }
        else {
          status = 0;
        }
        this.buildForm();
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

  cargarRequeridos(e){
    this.camposrequeridos = 'Valores Requeridos:\n';
    Object.keys(this.formarticulo.controls).forEach(key => {
      if (this.formarticulo.controls[key].invalid){
        this.camposrequeridos += key + '\n';
      }
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
  get stockminimo(){
    return this.formarticulo.get('stockminimo');
  }
  get stockmaximo(){
    return this.formarticulo.get('stockmaximo');
  }
  get cantidadreorden(){
    return this.formarticulo.get('cantidadreorden');
  }
    get talla(){
    return this.formarticulo.get('talla');
  }
  get peso(){
    return this.formarticulo.get('peso');
  }
  get color(){
    return this.formarticulo.get('color');
  }
 
  get codfamilia(){
    return this.formarticulo.get('codfamilia');
  }
  get codunidadmedida(){
    return this.formarticulo.get('codunidadmedida');
  }
  get codmarca(){
    return this.formarticulo.get('codmarca');
  }
 
  get codimpuesto(){
    return this.formarticulo.get('codimpuesto');
  }
  get status(){
    return this.formarticulo.get('status');
  }  
      
     
  onChangeTipo(event) {
    this.ArticuloModel.codtipoproducto = this.formarticulo.get('codtipoproducto').value;
    this.MostrarCamposTipoProducto(this.ArticuloModel.codtipoproducto);
  }
  onChange(event: MatSlideToggleChange) {
    this.formarticulo.get('status').setValue(event.checked === true ? '1' : '0');
  }
}
