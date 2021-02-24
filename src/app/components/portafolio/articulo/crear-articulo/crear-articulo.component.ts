import { CategoriaService } from './../../categoria/CategoriaService.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GrupoArticuloService } from 'src/app/components/grupoarticulo/GrupoArticuloService.service';
import { Articulo } from 'src/app/components/model/Articulo.model';
import { AlmacenService } from '../../almacen/AlmacenService.service';
import { CrearAlmacenModalComponent } from '../../almacen/crear-almacen-modal/crear-almacen-modal.component';
import { CrearCategoriaModalComponent } from '../../categoria/crear-categoria-modal/crear-categoria-modal.component';

import { ArticuloService } from '../ArticuloService.service';
import { formatDate } from '@angular/common';
import { ImpuestoService } from 'src/app/components/configuraciones/impuesto/ImpuestoService.service';
import { CrearUnidadModalComponent } from '../../unidad/crear-unidad-modal/crear-unidad-modal.component';
import { CrearMarcaModalComponent } from '../../marca/crear-marca-modal/crear-marca-modal.component';
import { CrearImpuestosModalComponent } from '../../impuestos/crear-impuestos-modal/crear-impuestos-modal.component';
import { UnidadService } from '../../unidad/UnidadService.service';
import { MarcaService } from '../../marca/MarcaService.service';
import { Kardex } from 'src/app/components/model/Kardex.model';
import { UnidadMedidaAlterna } from 'src/app/components/model/UnidadMedidaAlterna.model';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {

  precioconiva: number = 0;
  preciosiniva: number = 0;
  montoiva: number = 0;
  radioModel = 'Middle';
  uncheckableRadioModel = 'Middle';

  camposrequeridos: string;

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  id = 0;
  loading = false;
  lstFamilias: any[] = [];
  lstUnidades: any[] = [];
  //lstUnidadesAlternas:any[] = [];
  lstImpuestos: any[] = [];
  lstMarcas: any[] = [];
  lstAlmacenes: any[] = [];
  lstGrupoArticulos: any[] = [];



  lstmovimientoskardex: FormArray;
  lstunidadesalternas: FormArray;


  idnegocio: number;
  formarticulo: FormGroup;

  ArticuloModel: Articulo;
  unidadmedidaxdefecto: 2;
  idivaincluido: number = null;
  bsModalRef: any;
  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  customClass = 'customClass';
  isFirstOpen = true;

  visiblecostoxproducto = false;
  visiblecantidad = false;
  visiblecantidadminima = false;
  visiblecantidadmaxima = false;
  visiblepuntoreorden = false;
  visiblebodega = false;
  visiblereferencia = false;
  visibleserial = false;
  visiblecodigobarra = false;
  visiblemarca = false;
  visiblepeso = false;
  visibletalla = false;
  visiblecolor = false;


  codtipoproducto = [
    { id: 1, nombre: 'Producto' },
    { id: 2, nombre: 'Servicio' },
    { id: 3, nombre: 'Materia Prima' },
    { id: 4, nombre: 'Gasto' },
  ];

  tipoiva = [
    { id: 1, nombre: 'Gravado' },
    { id: 2, nombre: 'Exento' },
    { id: 3, nombre: 'Excluido' },

  ];

  ivaincluido = [
    { id: 1, nombre: 'Si' },
    { id: 2, nombre: 'No' },

  ];

  esimpoconsumo = [
    { id: 1, nombre: 'Si' },
    { id: 2, nombre: 'No' },

  ];

  constructor(private articuloservice: ArticuloService,
    private familiaserive: CategoriaService,
    private unidadservice: UnidadService,
    private impuestoservice: ImpuestoService,
    private marcaservice: MarcaService,
    private grupoarticuloservice: GrupoArticuloService,
    private almacenServicio: AlmacenService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private httpClient: HttpClient,) {

    this.ArticuloModel = new Articulo();
    this.idnegocio = 1;
    //this.idivaincluido = 2;
    //this.ArticuloModel.ivaincluido = this.idivaincluido;

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    if (this.route.snapshot.params.id) {
      this.id = this.route.snapshot.params.id;
      // this.buscarArticulo(this.id);
    }
    this.buildForm();

  }

  ngOnInit(): void {
    this.listarFamilias();
    this.listarUnidades();
    this.listarImpuestos();
    this.listarMarcas();
    this.listarBodegas();
    this.buscarArticulo(this.id);
    // this.listarGrupoArticulos();
    // this.listarBodegas();
  }

  private buildForm() {

    this.formarticulo = this.formbuilder.group({
      codigo: [this.ArticuloModel.codigo, [Validators.required]],
      nomarticulo: [this.ArticuloModel.nomarticulo, [Validators.required]],
      codtipoproducto: [this.ArticuloModel.codtipoproducto, [Validators.required]],
      codfamilia: [this.ArticuloModel.codfamilia, [Validators.required]],
      codunidadmedida: [this.ArticuloModel.codunidadmedida, [Validators.required]],
      codimpuesto: [this.ArticuloModel.codimpuesto, [Validators.required]],
      codmarca: [this.ArticuloModel.codmarca, [Validators.required]],
      preciosugerido: [this.ArticuloModel.preciosugerido, [Validators.pattern(this.parrterobservaciones)]],
      referencia: [this.ArticuloModel.referencia, [Validators.pattern(this.parrterobservaciones)]],
      serial: [this.ArticuloModel.serial, [Validators.pattern(this.parrterobservaciones)]],
      codigobarraprincipal: [this.ArticuloModel.codigobarraprincipal, [Validators.pattern(this.parrterobservaciones)]],
      descripcionlarga: [this.ArticuloModel.descripcionlarga, [Validators.pattern(this.parrterobservaciones)]],
      status: [this.ArticuloModel.status === 'ACTIVO' ? 1 : 0],
      stockminimo: [this.ArticuloModel.stockminimo, [Validators.pattern(this.parrterobservaciones)]],
      stockmaximo: [this.ArticuloModel.stockmaximo, [Validators.pattern(this.parrterobservaciones)]],
      cantidadreorden: [this.ArticuloModel.cantidadreorden, [Validators.pattern(this.parrterobservaciones)]],
      peso: [this.ArticuloModel.peso, [Validators.pattern(this.parrterobservaciones)]],
      talla: [this.ArticuloModel.talla, [Validators.pattern(this.parrterobservaciones)]],
      color: [this.ArticuloModel.color, [Validators.pattern(this.parrterobservaciones)]],
      tipoiva: [this.ArticuloModel.tipoiva, [Validators.pattern(this.parrterobservaciones)]],
      ivaincluido: [this.ArticuloModel.ivaincluido, [Validators.pattern(this.parrterobservaciones)]],
      esimpoconsumo: [this.ArticuloModel.esimpoconsumo, [Validators.pattern(this.parrterobservaciones)]],
      valorimpoconsumo: [this.ArticuloModel.valorimpoconsumo, [Validators.pattern(this.parrterobservaciones)]],
      porcentajeimpoconsumo: [this.ArticuloModel.porcentajeimpoconsumo, [Validators.pattern(this.parrterobservaciones)]],
      //lstmovimientoskardex: this.formbuilder.array([this.createItem()]),
      //lstunidadesalternas: this.formbuilder.array([this.createItemUnidadesalternas()])
      lstmovimientoskardex: this.formbuilder.array([]),
      lstunidadesalternas: this.formbuilder.array([])

    })
  }
  
  guardarArticulo(event: Event) {
    event.preventDefault();
    this.loading = true;
    const value = this.formarticulo.value;

    this.articuloservice.guardarArticulo(this.id, this.idnegocio, value)
      .subscribe(response => {
        this.loading = false;
        this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
        this.router.navigate(['/main/dashboard/portafolio/listararticulos']);
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




  listarFamilias() {
    this.loading = true;
    this.familiaserive.listarCategorias('')
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

  listarBodegas() {
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

  listarUnidades() {
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
  listarImpuestos() {
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
  listarMarcas() {
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
  listarGrupoArticulos() {
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

  MostrarCamposTipoProducto(event) {
    const idtipo = Number(event);
    if (idtipo === 1) {
      this.visiblecostoxproducto = true;
      this.visiblecantidad = true;
      this.visiblecantidadminima = true;
      this.visiblecantidadmaxima = true;
      this.visiblepuntoreorden = true;
      this.visiblebodega = true;
      this.visiblereferencia = true;
      this.visibleserial = true;
      this.visiblecodigobarra = true;
      this.visiblemarca = true;
      this.visiblepeso = true;
      this.visibletalla = true;
      this.visiblecolor = true;

    }
    else if (idtipo === 2) {

      this.visiblecostoxproducto = false;
      this.visiblecantidad = false;
      this.visiblecantidadminima = false;
      this.visiblecantidadmaxima = false;
      this.visiblebodega = false;
      this.visiblepuntoreorden = false;
      this.visiblereferencia = false;
      this.visibleserial = false;
      this.visiblecodigobarra = false;
      this.visiblemarca = false;
      this.visiblepeso = false;
      this.visibletalla = false;
      this.visiblecolor = false;
    }

    else if (idtipo === 3) {

      this.visiblecostoxproducto = false;
      this.visiblecantidad = false;
      this.visiblecantidadminima = false;
      this.visiblecantidadmaxima = false;
      this.visiblebodega = false;
      this.visiblepuntoreorden = false;
      this.visiblereferencia = false;
      this.visibleserial = false;
      this.visiblecodigobarra = false;
      this.visiblemarca = false;
      this.visiblepeso = false;
      this.visibletalla = false;
      this.visiblecolor = false;
    }
    else if (idtipo === 4) {

      this.visiblecostoxproducto = false;
      this.visiblecantidad = false;
      this.visiblecantidadminima = false;
      this.visiblecantidadmaxima = false;
      this.visiblebodega = false;
      this.visiblepuntoreorden = false;
      this.visiblereferencia = false;
      this.visibleserial = false;
      this.visiblecodigobarra = false;
      this.visiblemarca = false;
      this.visiblepeso = false;
      this.visibletalla = false;
      this.visiblecolor = false;
    }

  }
  onCrearBodega() {
    this.bsModalRef = this.modalService.show(CrearAlmacenModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
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
        console.log('el articulo ' + JSON.stringify(this.ArticuloModel));
        if (this.ArticuloModel.status === 'ACTIVO') {
          status = 1;
        }
        else {
          status = 0;
        }
        this.buildForm();
        const formarraylstkardex = this.formarticulo.get("lstmovimientoskardex") as FormArray;
        this.ArticuloModel.lstmovimientoskardex.map(item =>{
          formarraylstkardex.push(this.createItem(item));
        });
        this.formarticulo.setControl("lstmovimientoskardex", formarraylstkardex);
       /**  Cargar la lista de unidades alternas**/
       const formarraylstUnidadesAlternas = this.formarticulo.get("lstunidadesalternas") as FormArray;
       this.ArticuloModel.lstunidadesalternas.map(itemalterna =>{
        formarraylstUnidadesAlternas.push(this.createItemUnidadesalternas(itemalterna));
       });
       this.formarticulo.setControl("lstunidadesalternas", formarraylstUnidadesAlternas);
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

  cargarRequeridos(e) {
    this.camposrequeridos = 'Valores Requeridos:\n';
    Object.keys(this.formarticulo.controls).forEach(key => {
      if (this.formarticulo.controls[key].invalid) {
        this.camposrequeridos += key + '\n';
      }
    });
  }
  get codigo() {
    return this.formarticulo.get('codigo');
  }
  get nomarticulo() {
    return this.formarticulo.get('nomarticulo');
  }
  get referencia() {
    return this.formarticulo.get('referencia');
  }
  get serial() {
    return this.formarticulo.get('serial');
  }
  get codigobarraprincipal() {
    return this.formarticulo.get('codigobarraprincipal');
  }

  get descripcionlarga() {
    return this.formarticulo.get('descripcionlarga');
  }
  get preciosugerido() {
    return this.formarticulo.get('preciosugerido');
  }
  get stockminimo() {
    return this.formarticulo.get('stockminimo');
  }
  get stockmaximo() {
    return this.formarticulo.get('stockmaximo');
  }
  get cantidadreorden() {
    return this.formarticulo.get('cantidadreorden');
  }
  get talla() {
    return this.formarticulo.get('talla');
  }
  get peso() {
    return this.formarticulo.get('peso');
  }
  get color() {
    return this.formarticulo.get('color');
  }

  get codfamilia() {
    return this.formarticulo.get('codfamilia');
  }
  get codunidadmedida() {
    return this.formarticulo.get('codunidadmedida');
  }
  get codmarca() {
    return this.formarticulo.get('codmarca');
  }

  get codimpuesto() {
    return this.formarticulo.get('codimpuesto');
  }
  get status() {
    return this.formarticulo.get('status');
  }

  get valorimpoconsumo() {
    return this.formarticulo.get('valorimpoconsumo');
  }
  get porcentajeimpoconsumo() {
    return this.formarticulo.get('porcentajeimpoconsumo');
  }
  onChangeTipo(event) {
    this.ArticuloModel.codtipoproducto = this.formarticulo.get('codtipoproducto').value;
    this.MostrarCamposTipoProducto(this.ArticuloModel.codtipoproducto);
  }
  onChangeUnidadPrincipal(event){
    console.log(' el vaolor event', event);

    const formarraylstkardex = this.formarticulo.get("lstmovimientoskardex") as FormArray;
    formarraylstkardex.clear();
    this.ArticuloModel.lstmovimientoskardex = [];
    this.formarticulo.setControl("lstmovimientoskardex", formarraylstkardex);

    const formarraylstUnidadesAlternas = this.formarticulo.get("lstunidadesalternas") as FormArray;
    formarraylstUnidadesAlternas.clear();
    this.ArticuloModel.lstunidadesalternas = [];
    this.formarticulo.setControl("lstunidadesalternas", formarraylstUnidadesAlternas);
  }
  
  onChange(event: MatSlideToggleChange) {
    this.formarticulo.get('status').setValue(event.checked === true ? '1' : '0');
  }

  onCrearCategoria() {
    this.bsModalRef = this.modalService.show(CrearCategoriaModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      if (result) {
        this.listarFamilias();
      }

    });
  }
  onCrearImpuesto() {
    this.bsModalRef = this.modalService.show(CrearImpuestosModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      if (result) {
        this.listarImpuestos();
      }

    });
  }
  onCrearUnidad() {
    this.bsModalRef = this.modalService.show(CrearUnidadModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      if (result) {
        this.listarUnidades();
      }

    });
  }
  onCrearMarca() {
    this.bsModalRef = this.modalService.show(CrearMarcaModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      if (result) {
        this.listarMarcas();
      }

    });
  }
  
  addItemUnidadesAlternas(): void {
    this.ListItemsUnidasesAlternas.push(this.formbuilder.group({
      codnegocio: [this.idnegocio],
      //codarticulo: [0, [Validators.required]],
      codunidadmedidaalterna: [0, [Validators.required]],
      codunidadminima: [0, [Validators.required]],
      valorconversion: [0, [Validators.required]],
      fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]],
    }));
  }
  get ListItems(): FormArray {
    return this.formarticulo.get("lstmovimientoskardex") as FormArray
  }

  get ListItemsUnidasesAlternas(): FormArray {
    return this.formarticulo.get("lstunidadesalternas") as FormArray
  }

  /*createItem(): FormGroup {
    return this.formbuilder.group({
      codnegocio: [this.idnegocio],
      // documentoid: [0],
      // articulo_id: [0, [Validators.required]],
      codunidadmedida: [0, [Validators.required]],
      codalmacen: [0, [Validators.required]],
      cantidad: [1, [Validators.required]],
      montoxunidad: [1, [Validators.required]],
      montototal: [1, [Validators.required]],
      status: ['A', [Validators.required]],
      fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]],

    });
  }*/

  createItem(kardex: Kardex): FormGroup {
    return this.formbuilder.group({
      codnegocio: [this.idnegocio],
      // documentoid: [0],
      articulo_id: [kardex.articulo_id, [Validators.required]],
      codunidadmedida: [kardex.codunidadmedida, [Validators.required]],
      codalmacen: [kardex.codalmacen, [Validators.required]],
      cantidad: [kardex.cantidad, [Validators.required]],
      montoxunidad: [kardex.montoxunidad, [Validators.required]],
      montototal: [kardex.montototal, [Validators.required]],
      status: [kardex.status, [Validators.required]],
      fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]],

    });
  }

  addItem(): void {
    this.ListItems.push(this.formbuilder.group({
      codnegocio: [this.idnegocio],
      //articulo_id: [0, [Validators.required]],
      codunidadmedida: [0, [Validators.required]],
      codalmacen: [0, [Validators.required]],
      cantidad: [1, [Validators.required]],
      montoxunidad: [1, [Validators.required]],
      montototal: [1, [Validators.required]],
      status: ['A', [Validators.required]],
      fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]]
    }));
  }

  createItemUnidadesalternas(unidadmedidaalterna: UnidadMedidaAlterna): FormGroup {
    return this.formbuilder.group({
      codnegocio: [this.idnegocio],
      // documentoid: [0],
      // articulo_id: [0, [Validators.required]],
      /* codunidadmedida: [0, [Validators.required]],
       codalmacen: [0, [Validators.required]],
       cantidad: [1, [Validators.required]],
       montoxunidad: [1, [Validators.required]],
       montototal:[1, [Validators.required]],
       status: ['A', [Validators.required]],*/

      //codarticulo: [0, [Validators.required]],
      codunidadmedidaalterna: [unidadmedidaalterna.codunidadmedidaalterna, [Validators.required]],
      codunidadminima: [unidadmedidaalterna.codunidadminima, [Validators.required]],
      valorconversion: [unidadmedidaalterna.valorconversion, [Validators.required]],
      //fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]],

    });
  }

  CalcularPrecioVenta(event) {
    var valorimpuesto: number = 0;
    var montoimpuesto: number = 0;
    var precio: number = 0;
    var precioiva: number = 0;
    var porcentajeiva: number = 0;
    var tieneivaincluido: number;
    var preciosinivas: number = 0;

    valorimpuesto = this.lstImpuestos[event - 1].normal;
    
    console.log('event' + event);
    console.log('valorimpuesto ' + valorimpuesto);
    tieneivaincluido = Number(this.formarticulo.get('ivaincluido').value);
    console.log('tieneivaincluido ' + tieneivaincluido);
    precio = Number(this.formarticulo.get('preciosugerido').value);

    if (tieneivaincluido === 2) {
      console.log('entro por 2 ' + tieneivaincluido);
      montoimpuesto = (precio * valorimpuesto) / 100;
      console.log('valorimpuesto ' + valorimpuesto);
      this.preciosiniva = precio;
      this.montoiva = montoimpuesto;
      precioiva = precio + montoimpuesto;
      this.precioconiva = precioiva;
      console.log('precio ' + precio);
      console.log('montoimpuesto ' + montoimpuesto);
      console.log('precioconiva ' + precioiva);

    }
    else if (tieneivaincluido === 1) {
      console.log('entro por 1 ');
      this.precioconiva = precio;

      porcentajeiva = (valorimpuesto / 100) + 1;
      console.log('porcentajeiva ' + porcentajeiva);
      preciosinivas = precio / porcentajeiva;
      console.log('preciosinivas ' + preciosinivas);
      this.preciosiniva = preciosinivas;

      montoimpuesto = (preciosinivas * valorimpuesto) / 100;
      this.montoiva = montoimpuesto;


    }
    //this.formarticulo.get('precioconiva').setValue(Number(digitoverificacion));}
  }
}