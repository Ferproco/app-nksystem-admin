
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto } from '../../model/Contacto.model';
import { DocumentoVenta } from '../../model/DocumentoVenta.model';
import { DocumentosVentasService } from '../documentos-ventas.service';
import { Articulo } from '../../model/Articulo.model';
import { AlmacenService } from '../../portafolio/almacen/AlmacenService.service';
import { FormaPagoService } from '../../portafolio/formapago/FormaPagoService.service';
import { ArticuloService } from '../../portafolio/articulo/ArticuloService.service';
import { CatalogoArticuloModalComponent } from '../../portafolio/articulo/catalogo-articulo-modal/catalogo-articulo-modal.component';
import { ContactoService } from '../../portafolio/contacto/ContactoService.service';
import { VendedorService } from '../../portafolio/vendedor/VendedorService.service';
import { ModalClienteComponent } from '../../portafolio/contacto/modal-cliente/modal-cliente.component';
import { NumeracionDocumentoService } from '../../configuraciones/numeraciondocumento/NumeracionDocumentoService.service';
import { ImpuestoService } from '../../configuraciones/impuesto/ImpuestoService.service';

import { NumeracionDocumento } from '../../model/NumeracionDocumento.model';
import { MatTableDataSource } from '@angular/material/table';
import { TipoDocumentoService } from '../../configuraciones/tipodocumento/TipoDocumentoService.service';
import { CrearFormapagoModalComponent } from '../../portafolio/formapago/crear-formapago-modal/crear-formapago-modal.component';
import { UnidadService } from '../../portafolio/unidad/UnidadService.service';

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

  lstformaspago: any[] = [];
  lstVendedores: any[] = [];
  lstUnidades: any[] = [];
  lstImpuestos: any[] = [];
  lstAlmacenes: any[] = [];
  lstNumeracionDocumento: any[] = [];

  DocumentoVentaForm: FormGroup;
  lstdetallesdocumentoventas: FormArray;

  tipodocumento: string = '';
  titulo: string = '';
  url: string = '';


  id = 0;
  idnegocio: number;
  nombreprimero: string;
  numeroidentificacion: string;
  direccionfiscal: string;
  precsiniva: number;
  cant: number;
  tipopersona: string;
  telefono: string;
  ContactoModel: Contacto;
  DocumentoVentaModel: DocumentoVenta;
  ArticuloModel: Articulo;
  numeracionDocumentoModel: NumeracionDocumento;
  prefijofactura:string;
  numerodocumentos: number;
  numerodocumentoconcatenado:string;
  nombrearticulo: string[] = [];

  constructor(private contactoServicio: ContactoService,
    private DocumentoventaServicio: DocumentosVentasService,
    private modalService: BsModalService,
    private numeraciondocumentoServicio: NumeracionDocumentoService,
    private FormaPagoService: FormaPagoService,
    private VendedorService: VendedorService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private Unidadservice: UnidadService,
    private Impuestoservice: ImpuestoService,
    private Almacenservice: AlmacenService,
    private Articuloservicio: ArticuloService,
    private tipodocumentoServicio: TipoDocumentoService) {


    this.DocumentoVentaModel = new DocumentoVenta();
    this.idnegocio = 1;
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    if (this.route.snapshot.params.tipodocumento) {
      this.tipodocumento = this.route.snapshot.params.tipodocumento;

    }
    if (this.route.snapshot.params.id) {
      this.id = this.route.snapshot.params.id;
    }
  }

  ngOnInit(): void {

    this.onTipoDocumento(this.tipodocumento);
    this.listarNumeracionDocumento(this.tipodocumento);
    this.buildForm();

    this.listarVendedores();
    this.listarFormasdepago();
    this.onListarImpuestos();
    this.onListarUnidades();
    this.onListarAlmacen();
  }


  private buildForm() {

    this.DocumentoVentaModel.tipodocumento = this.tipodocumento;
    this.DocumentoVentaModel.codnegocio = this.idnegocio;
    this.DocumentoVentaForm = this.formBuilder.group({
      numerodocumento: [this.DocumentoVentaModel.numerodocumento, [Validators.required]],
      codformapago: [this.DocumentoVentaModel.codformapago, [Validators.required]],
      codcontacto: [this.DocumentoVentaModel.codcontacto, [Validators.required]],
      codvendedor: [this.DocumentoVentaModel.codvendedor, [Validators.required]],
      fechaemision: [formatDate(this.DocumentoVentaModel.fechaemision, 'dd-MM-yyyy', 'en'), [Validators.required]],
      fechavencimiento: [formatDate(this.DocumentoVentaModel.fechavencimiento, 'dd-MM-yyyy', 'en'), [Validators.required]],
      fecha: [formatDate(this.DocumentoVentaModel.fecha, 'dd-MM-yyyy', 'en'), [Validators.required]],
      referencia: [this.DocumentoVentaModel.referencia],
      status: [this.DocumentoVentaModel.status === 'ACTIVO' ? 1 : 0],
      baseimp: [this.DocumentoVentaModel.baseimp],
      isrl: [this.DocumentoVentaModel.isrl],
      observacion: [this.DocumentoVentaModel.observacion],
      numcontrol: [this.DocumentoVentaModel.numcontrol],
      numretencion: [this.DocumentoVentaModel.numretencion],
      pctiva_a: [this.DocumentoVentaModel.pctiva_a],
      pctiva_b: [this.DocumentoVentaModel.pctiva_b],
      descuento: [this.DocumentoVentaModel.descuento],
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

    (this.DocumentoVentaForm.get('lstdetallesdocumentoventas') as FormArray).valueChanges.subscribe(values => {
      console.log('Cambios en el form ' + JSON.stringify(values));
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      codnegocio: [this.idnegocio],
      documentoid: [0],
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
      tipoarticulo: ['A', [Validators.required]],
      fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]],
      serial: [''],
      garantia: [''],
      tipodocumento: [this.tipodocumento]
    });
  }

  addItem(): void {

    this.ListItems.push(this.formBuilder.group({
      codnegocio: [this.idnegocio],
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
      tipoarticulo: ['A', [Validators.required]],
      fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]],
      serial: [''],
      garantia: [''],
      tipodocumento: [this.tipodocumento]
    }));
  }

  get ListItems(): FormArray {
    return this.DocumentoVentaForm.get("lstdetallesdocumentoventas") as FormArray
  }


  onFormSubmit(event: Event) {
    event.preventDefault();
    let data = JSON.stringify(this.DocumentoVentaForm.value);
    console.log('-----Team in JSON Format-----');
    console.log(data);

    console.log('entro al guardar de ventas');
    event.preventDefault();
    this.loading = true;
    const value = this.DocumentoVentaForm.value;
    this.DocumentoventaServicio.guardarDocumentoVenta(this.id, this.idnegocio, value)
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
          this.nombreprimero = this.ContactoModel.razonsocial;
        }
        else {
          this.nombreprimero = this.ContactoModel.nombreprimero + ' ' +
            this.ContactoModel.nombresegundo + ' ' +
            this.ContactoModel.apellidoprimero + ' ' +
            this.ContactoModel.apellidosegundo;
        }
        this.DocumentoVentaForm.controls['codcontacto'].setValue(this.ContactoModel.id);
        this.numeroidentificacion = this.ContactoModel.numeroidentificacion;
        this.telefono = this.ContactoModel.telefonofijo1;
        this.direccionfiscal = this.ContactoModel.direccionfiscal;
        if (this.ContactoModel.codtipopersona === 1)
          if (this.ContactoModel.codtipopersona === 1) {
            this.tipopersona = 'Persona Natural';
          }
          else {
            this.tipopersona = 'Persona Juridica';
          }
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
  onListarClientes() {
    const config: ModalOptions = { class: 'modal-lg' };
    this.bsModalRef = this.modalService.show(ModalClienteComponent, config);
    this.bsModalRef.content.onSelect.subscribe(result => {
      console.log('results', result);
      this.buscarContacto(result);
    });

  }

  onListarArticulos(pos: number) {
    console.log('la posicion ' + pos);
    const config: ModalOptions = { class: 'modal-lg' };
    this.bsModalRef = this.modalService.show(CatalogoArticuloModalComponent, config);
    this.bsModalRef.content.onSelect.subscribe(result => {
      console.log('results', result);
      this.buscarArticulo(result, pos);
    });
  }

  buscarArticulo(id: number, pos: number) {
    let status = 0;
    const obj = this.Articuloservicio.mostrarArticulo(id)
      .subscribe(response => {
        this.ArticuloModel = response as any;
        if (this.ArticuloModel.status === 'ACTIVO') {
          status = 1;
        }
        else {
          status = 0;
        }
        this.ListItems.controls[pos].get('codarticulo').setValue(this.ArticuloModel.id);
        this.nombrearticulo[pos] = this.ArticuloModel.nomarticulo;
        this.ListItems.controls[pos].get('preciounitariosiniva').setValue(this.ArticuloModel.preciosugerido);
        this.ListItems.controls[pos].get('codunidadmedida').setValue(this.ArticuloModel.codunidadmedida);
        this.ListItems.controls[pos].get('codimpuesto').setValue(this.ArticuloModel.codimpuesto);
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

  onCrearPlazoCredito() {
    this.bsModalRef = this.modalService.show(CrearFormapagoModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.listarFormasdepago();
      }
      console.log('results', result);
    });
  }

  listarFormasdepago() {
    this.loading = true;
    this.FormaPagoService.listarFormaPagos('')
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
    this.VendedorService.listarVendedores('')
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

  onTipoDocumento(tipo) {
    if (tipo === 'factura') {
      this.titulo = 'Factura de Venta';
      this.url = '/ventas/catalogodocumentodeventa-factura/factura';
    }
    else if (tipo === 'cotizacion') {
      this.titulo = 'Cotizaciones';
      this.url = '/ventas/catalogodocumentodeventa-cotizacion/cotizacion';
    }
  }

  onRedireccionar(tipo) {
    if (tipo === 'factura') {
      this.router.navigate(['/main/dashboard/ventas/catalogodocumentodeventa-factura/factura']);

    }
    else if (tipo === 'cotizacion') {
      this.router.navigate(['ventas/catalogodocumentodeventa-cotizacion/cotizacion']);

    }
  }

  onListarUnidades() {
    this.loading = true;
    this.Unidadservice.listarUnidades('')
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
    this.Impuestoservice.listarImpuestos('')
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

  onListarAlmacen() {
    this.loading = true;
    this.Almacenservice.listarAlmacenes('')
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
  /*onCrearNumeracionDocumento() {
    this.bsModalRef = this.modalService.show(CrearNumeraciondocumentoModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      if (result) {
         this.listarNumeracionDocumento(this.tipodocumento);
      }

    });
  }*/


  CalcularPrecioVenta(event) {

    console.log('event' + event);

    this.precsiniva = this.ArticuloModel.preciosugerido * event;
    this.cant = event;

  }
  CalcularPrecioVenta2(event) {

    console.log('event' + event);

    this.precsiniva = this.cant * event;



  }


  private listarNumeracionDocumento(tipo: string): void {
    this.loading = true;
    this.lstNumeracionDocumento = [];
    this.numeraciondocumentoServicio.obtenerNumeracionDocumentoPorTipoDocumento('', this.tipodocumento)
      .subscribe(response => {
        this.lstNumeracionDocumento = response as NumeracionDocumento[];
        //console.log('lstNumeracionDocumento' + JSON.stringify(this.lstNumeracionDocumento));
        this.lstNumeracionDocumento.forEach(element => {

          if (element.tipodedocumento === 'factura') {
            if (element.principal) {
              console.log('es principal');
          
            this.prefijofactura=element.prefijo;
            this.numerodocumentos = element.proximonumerodocumento;
            this.numerodocumentoconcatenado= element.prefijo + element.proximonumerodocumento,
            this.DocumentoVentaForm.controls['numerodocumento'].setValue(this.numerodocumentoconcatenado );

            console.log('numerodocumentos ' + this.numerodocumentos);
          }
          }

          //this.numerodocumento=this.numerodocumentos;
        });
        /*this.dataSource = new MatTableDataSource(this.lstNumeracionDocumento);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstDocumentos.length;
        this.sortedData = this.lstDocumentos.slice();
        this.loading = false;*/
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

  onModificarNumeracionDocumento(){
    //this.router.navigate(['inventario/creararticulo', id]);
    //this.router.navigate(['main/dashboard/configuraciones/crearnumeraciondocumento', id]);

    //this.bsModalRef = this.modalService.show(CrearNumeraciondocumentoModalComponent);
    //this.bsModalRef.content.onClose.subscribe(result => {
    //  if (result) {
       // this.listarFormasdepago();
      //}
     // console.log('results', result);
    //});
  }

}
