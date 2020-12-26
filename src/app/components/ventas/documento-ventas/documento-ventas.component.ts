import { ModalClienteComponent } from '../../contacto/modal-cliente/modal-cliente.component';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CrearFormapagoModalComponent } from '../../formapago/crear-formapago-modal/crear-formapago-modal.component';
import { FormaPagoService } from '../../formapago/FormaPagoService.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { VendedorService } from '../../vendedor/VendedorService.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactoService } from '../../contacto/ContactoService.service';
import { Contacto } from '../../model/Contacto.model';
import { DocumentoVenta } from '../../model/DocumentoVenta.model';
import { DocumentosVentasService } from '../documentos-ventas.service';
import { UnidadService } from '../../unidadmedida/UnidadService.service';
import { ImpuestoService } from '../../impuesto/ImpuestoService.service';

@Component({
  selector: 'app-documento-ventas',
  templateUrl: './documento-ventas.component.html',
  styleUrls: ['./documento-ventas.component.css']
})



export class DocumentoVentasComponent implements OnInit {

  loading = false;
  bsModalRef: BsModalRef;

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  customClass = 'customClass';
  isFirstOpen = true;

  lstformaspago: any [] = [];
  lstVendedores: any [] = [];
  lstUnidades: any[] = [];
  lstImpuestos: any[] = [];

  allTeamDetails: any [] = [
    {coditem: '00001', nombre: 'Elemento 1'}
  ];

  DocumentoVentaForm: FormGroup;
  lstdetallesdocumentoventas: FormArray;

  tipodocumento: string = '';
  titulo: string = '';
  url: string = '';

  id = 0;
  idnegocio: number;
  nombreprimero: string;
  numeroidentificacion:string;
  direccionfiscal:string;

  tipopersona:string;
  telefono:string;
  ContactoModel: Contacto;
  DocumentoVentaModel:DocumentoVenta;



  constructor(private contactoServicio: ContactoService,
              private documentoventaServicio: DocumentosVentasService,
              private modalService: BsModalService,
              private formaPagoService: FormaPagoService,
              private vendedorService: VendedorService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              private unidadservice: UnidadService,
              private impuestoservice: ImpuestoService,) {


    this.DocumentoVentaModel = new DocumentoVenta();
    this.idnegocio = 1;
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    if (this.route.snapshot.params.tipodocumento){
      this.tipodocumento = this.route.snapshot.params.tipodocumento;

    }
    if (this.route.snapshot.params.id){
      this.id = this.route.snapshot.params.id;
    }
  }

  ngOnInit(): void {

    this.onTipoDocumento(this.tipodocumento);
    this. buildForm();

    this.listarVendedores();
    this.listarFormasdepago();
    this.onListarImpuestos();
    this.onListarUnidades();
  }


  private buildForm(){

    this.DocumentoVentaModel.tipodocumento = this.tipodocumento;
    this.DocumentoVentaModel.codnegocio = this.idnegocio;
    this.DocumentoVentaForm = this.formBuilder.group({
      numerodocumento:[this.DocumentoVentaModel.numerodocumento, [Validators.required]],
      codformapago: [this.DocumentoVentaModel.codformapago, [Validators.required]],
      codcontacto: [this.DocumentoVentaModel.codcontacto, [Validators.required]],
      codvendedor:[this.DocumentoVentaModel.codvendedor, [Validators.required]],
      fechaemision:[formatDate(this.DocumentoVentaModel.fechaemision, 'dd-MM-yyyy', 'en'), [Validators.required]],
      fechavencimiento:[formatDate(this.DocumentoVentaModel.fechavencimiento, 'dd-MM-yyyy', 'en'), [Validators.required]],
      fecha:[formatDate(this.DocumentoVentaModel.fecha, 'dd-MM-yyyy', 'en'), [Validators.required]],
      referencia:[this.DocumentoVentaModel.referencia],
      status: [this.DocumentoVentaModel.status === 'ACTIVO' ? 1 : 0],
      baseimp:[this.DocumentoVentaModel.baseimp],
      isrl: [this.DocumentoVentaModel.isrl],
      observacion: [this.DocumentoVentaModel.observacion],
      numcontrol: [this.DocumentoVentaModel.numcontrol],
      numretencion: [this.DocumentoVentaModel.numretencion],
      pctiva_a: [this.DocumentoVentaModel.pctiva_a],
      pctiva_b: [this.DocumentoVentaModel.pctiva_b],
      descuento:[this.DocumentoVentaModel.descuento],
      subtotal: [this.DocumentoVentaModel.subtotal],
      total: [this.DocumentoVentaModel.total],
      montoretenido: [this.DocumentoVentaModel.montoretenido],
      status_cobro: [this.DocumentoVentaModel.status_cobro],
      tipodocumento: [this.DocumentoVentaModel.tipodocumento],
      contable: [this.DocumentoVentaModel.contable],
      numeroz: [this.DocumentoVentaModel.numeroz],
      status_impresion: [this.DocumentoVentaModel.status_impresion],
      codruta: [this.DocumentoVentaModel.codruta],

      //lstdetallesdocumentoventas: this.formBuilder.array([this.formBuilder.group({codigo: '', descripcion: '', price: ''})])
      lstdetallesdocumentoventas: this.formBuilder.array([this.createItem()])
    });


  }

  createItem(): FormGroup {
        return this.formBuilder.group({
      codarticulo: [0, [Validators.required]],
      codimpuesto: [0, [Validators.required]],
      codunidadmedida: [0, [Validators.required]],
      codalmacen: [0, [Validators.required]],
      cantidad: [1, [Validators.required]],
      preciounitariosiniva: [0, [Validators.required]],
      montototalconiva: [0, [Validators.required]],
      baseimponible: [0, [Validators.required]],
      porcentajedescuento: [0, [Validators.required]],
      montodescuento: [0, [Validators.required]],
      porcentajeimpuesto: [0, [Validators.required]],
      montoimpuesto: [0, [Validators.required]],
      islr: [0, [Validators.required]],
      porcentajeislr: [0, [Validators.required]],
      status: ['A', [Validators.required]],
      tipoarticulo: ['A', [Validators.required]]

    });
  }

  addItem(): void {

    this.ListItems.push(this.formBuilder.group({ codarticulo: [0, [Validators.required]],
      codimpuesto: [0, [Validators.required]],
      codunidadmedida: [0, [Validators.required]],
      codalmacen: [0, [Validators.required]],
      cantidad: [1, [Validators.required]],
      preciounitariosiniva: [0, [Validators.required]],
      montototalconiva: [0, [Validators.required]],
      baseimponible: [0, [Validators.required]],
      porcentajedescuento: [0, [Validators.required]],
      montodescuento: [0, [Validators.required]],
      porcentajeimpuesto: [0, [Validators.required]],
      montoimpuesto: [0, [Validators.required]],
      islr: [0, [Validators.required]],
      porcentajeislr: [0, [Validators.required]],
      status: ['A', [Validators.required]],
      tipoarticulo: ['A', [Validators.required]]}));
  }

  get ListItems() : FormArray {
    return this.DocumentoVentaForm.get("lstdetallesdocumentoventas") as FormArray
  }


  onFormSubmit(event: Event){
    event.preventDefault();
    let data = JSON.stringify(this.DocumentoVentaForm.value);
    console.log('-----Team in JSON Format-----');
    console.log(data);

    console.log('entro al guardar de ventas');
    event.preventDefault();
    this.loading = true;
    const value = this.DocumentoVentaForm.value;
    this. documentoventaServicio.guardarDocumentoVenta(this.id, this.idnegocio, value)
    .subscribe(response => {
      this.loading = false;
      this.toastr.info('El Documento se guardo correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.onRedireccionar(this.tipodocumento);
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

  buscarContacto(id: number) {

    const obj = this.contactoServicio.mostrarContactos(id)
      .subscribe(response => {
        this.ContactoModel = response as any;

        if (this.nombreprimero === '') {
          this.nombreprimero =this.ContactoModel.razonsocial;
        }
        else {
          this.nombreprimero = this.ContactoModel.nombreprimero   + ' ' +
                               this.ContactoModel.nombresegundo   + ' ' +
                               this.ContactoModel.apellidoprimero + ' ' +
                               this.ContactoModel.apellidosegundo;
        }
        this.DocumentoVentaForm.controls['codcontacto'].setValue(this.ContactoModel.id);
        //this.nombreprimero = this.ContactoModel
        this.numeroidentificacion=this.ContactoModel.numeroidentificacion;
        this.telefono=this.ContactoModel.telefonofijo1;
        this.direccionfiscal=this.ContactoModel.direccionfiscal;
        if(this.ContactoModel.codtipopersona===1)
        if (this.ContactoModel.codtipopersona === 1) {
          this.tipopersona = 'Persona Natural';
        }
        else {
          this.tipopersona = 'Persona Juridica';
        }
       // direccionfiscal: this.ContactoModel.direccionfiscal,
        console.log('el cliente es de build form ' + this.ContactoModel.numeroidentificacion);
        console.log('el codigo tipo persona es de build form ' + this.ContactoModel.codtipopersona);
       // this.buildForm();

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
  onListarClientes(){

    const config: ModalOptions = { class: 'modal-lg' };
    this.bsModalRef = this.modalService.show(ModalClienteComponent, config);
    this.bsModalRef.content.onSelect.subscribe(result => {
      console.log('results', result);
      this.buscarContacto(result);

    });
    /*this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);

    });*/
  }

  onListarArticulos(){


  }

  onCrearPlazoCredito(){
    this.bsModalRef = this.modalService.show(CrearFormapagoModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result){
        this.listarFormasdepago();
      }
      console.log('results', result);

    });
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

  onTipoDocumento(tipo){
    if (tipo === 'factura'){
      this.titulo = 'Factura de Venta';
      this.url = '/ventas/catalogodocumentodeventa-factura/factura';
    }
    else if (tipo === 'cotizacion'){
      this.titulo = 'Cotizaciones';
      this.url = '/ventas/catalogodocumentodeventa-cotizacion/cotizacion';
    }
  }

  onRedireccionar(tipo){
    if (tipo === 'factura'){
      this.router.navigate(['ventas/catalogodocumentodeventa-factura/factura']);

    }
    else if (tipo === 'cotizacion'){
      this.router.navigate(['ventas/catalogodocumentodeventa-cotizacion/cotizacion']);

    }
  }

  onListarUnidades() {
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
  onListarImpuestos() {
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

}
