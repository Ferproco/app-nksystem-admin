import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ArticuloService } from '../../articulo/ArticuloService.service';
import { CatalogoArticuloModalComponent } from '../../articulo/catalogo-articulo-modal/catalogo-articulo-modal.component';
import { ContactoService } from '../../contacto/ContactoService.service';
import { ModalClienteComponent } from '../../contacto/modal-cliente/modal-cliente.component';
import { CrearFormapagoModalComponent } from '../../formapago/crear-formapago-modal/crear-formapago-modal.component';
import { FormaPagoService } from '../../formapago/FormaPagoService.service';
import { Articulo } from '../../model/Articulo.model';
import { Contacto } from '../../model/Contacto.model';
import { DocumentoCompra } from '../../model/DocumentoCompra.model';
import { VendedorService } from '../../vendedor/VendedorService.service';
import { DocumentoCompraService } from '../DocumentoCompraService.service';

@Component({
  selector: 'app-documentos-compras',
  templateUrl: './documentos-compras.component.html',
  styleUrls: ['./documentos-compras.component.css']
})
export class DocumentosComprasComponent implements OnInit {

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

  DocumentoCompraForm: FormGroup;
  lstdetallesdocumentocompras: FormArray;

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
  ArticuloModel:Articulo;
  DocumentoCompraModel:DocumentoCompra;

  constructor(private contactoServicio: ContactoService,
    private articuloServicio: ArticuloService,
    private documentocompraServicio: DocumentoCompraService,
    private modalService: BsModalService,
    private formaPagoService: FormaPagoService,
    private vendedorService: VendedorService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient) {

    this.DocumentoCompraModel = new DocumentoCompra();
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
  }

  private buildForm(){

    this.DocumentoCompraModel.tipodocumento = this.tipodocumento;
    this.DocumentoCompraModel.codnegocio = this.idnegocio;
    this.DocumentoCompraForm = this.formBuilder.group({
      numerodocumento:[this.DocumentoCompraModel.numerodocumento, [Validators.required]],
      codformapago: [this.DocumentoCompraModel.codformapago, [Validators.required]],
      codcontacto: [this.DocumentoCompraModel.codcontacto, [Validators.required]],
      codvendedor:[this.DocumentoCompraModel.codvendedor, [Validators.required]],
      fechaemision:[formatDate(this.DocumentoCompraModel.fechaemision, 'dd-MM-yyyy', 'en'), [Validators.required]],
      fechavencimiento:[formatDate(this.DocumentoCompraModel.fechavencimiento, 'dd-MM-yyyy', 'en'), [Validators.required]],
      fecha:[formatDate(this.DocumentoCompraModel.fecha, 'dd-MM-yyyy', 'en'), [Validators.required]],
      referencia:[this.DocumentoCompraModel.referencia],
      status: [this.DocumentoCompraModel.status === 'ACTIVO' ? 1 : 0],
      baseimp:[this.DocumentoCompraModel.baseimp],
      isrl: [this.DocumentoCompraModel.isrl],
      observacion: [this.DocumentoCompraModel.observacion],
      numcontrol: [this.DocumentoCompraModel.numcontrol],
      numretencion: [this.DocumentoCompraModel.numretencion],
      pctiva_a: [this.DocumentoCompraModel.pctiva_a],
      pctiva_b: [this.DocumentoCompraModel.pctiva_b],
      descuento:[this.DocumentoCompraModel.descuento],
      subtotal: [this.DocumentoCompraModel.subtotal],
      total: [this.DocumentoCompraModel.total],
      montoretenido: [this.DocumentoCompraModel.montoretenido],
      status_cobro: [this.DocumentoCompraModel.status_cobro],
      tipodocumento: [this.DocumentoCompraModel.tipodocumento],
      contable: [this.DocumentoCompraModel.contable],
      numeroz: [this.DocumentoCompraModel.numeroz],
      status_impresion: [this.DocumentoCompraModel.status_impresion],
      codruta: [this.DocumentoCompraModel.codruta],
      lstdetallesdocumentocompras: this.formBuilder.array([this.createItem()])
      //itemDetails: this.formBuilder.array([this.formBuilder.group({codigo: '', descripcion: '', price: ''})])

    });


  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      codigo: '',
      descripcion: '',
      price: ''
    });
  }

  addItem(): void {
    /*this.itemDetails = this.DocumentoVentaForm.get('itemDetails') as FormArray;
    this.itemDetails.push(this.createItem());*/
    let fg = this.formBuilder.group(this.createItem());
    this.ListItems.push(this.formBuilder.group({codigo: '', descripcion: '', price: ''}));
  }



  get ListItems() : FormArray {
    return this.DocumentoCompraForm.get("lstdetallesdocumentocompras") as FormArray
  }

  onFormSubmit(event: Event){
    event.preventDefault();
    let data = JSON.stringify(this.DocumentoCompraForm.value);
    console.log('-----Team in JSON Format-----');
    console.log(data);

    console.log('entro al guardar de ventas');
    event.preventDefault();
    this.loading = true;
    const value = this.DocumentoCompraForm.value;
    this. documentocompraServicio.guardarDocumentoCompra(this.id, this.idnegocio, value)
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
  buscarArticulo(id: number) {
    let status = 0;
    const obj = this.articuloServicio.mostrarArticulo(id)
      .subscribe(response => {
        this.ArticuloModel = response as any;

        if (this.ArticuloModel.status === 'ACTIVO') {
          status = 1;
        }
        else {
          status = 0;
        }

        this.DocumentoCompraForm.controls['codarticulo'].setValue(this.ArticuloModel.id);
        //this.nombreprimero = this.ContactoModel
        /*this.numeroidentificacion=this.ContactoModel.numeroidentificacion;
        this.telefono=this.ContactoModel.telefonofijo1;
        this.direccionfiscal=this.ContactoModel.direccionfiscal;
        if(this.ContactoModel.codtipopersona===1)
        if (this.ContactoModel.codtipopersona === 1) {
          this.tipopersona = 'Persona Natural';
        }
        else {
          this.tipopersona = 'Persona Juridica';
        }
*/

       // direccionfiscal: this.ContactoModel.direccionfiscal,
        console.log('el cliente es de build form ' + this.ArticuloModel.nomarticulo);
        console.log('el codigo tipo articulo es de build form ' + this.ArticuloModel.codtipoproducto);
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
        this.DocumentoCompraForm.controls['codcontacto'].setValue(this.ContactoModel.id);
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
    const config: ModalOptions = { class: 'modal-lg' };
    this.bsModalRef = this.modalService.show(CatalogoArticuloModalComponent, config);
    this.bsModalRef.content.onSelect.subscribe(result => {
      console.log('results', result);
      this.buscarArticulo(result);

    });
    /*this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);

    });*/

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
    if (tipo === 'facturacompra'){
      this.titulo = 'Factura de Compra';
      this.url = '/compras/catalogodocumentodecompra-factura/facturacompra';
    }
    else if (tipo === 'cotizacion'){
      this.titulo = 'Cotizaciones';
      this.url = '/ventas/catalogodocumentodeventa-cotizacion/cotizacion';
    }
  }

  onRedireccionar(tipo){
    if (tipo === 'facturacompra'){
      this.router.navigate(['compras/catalogodocumentodecompra-factura/facturacompra']);

    }
    else if (tipo === 'cotizacion'){
      this.router.navigate(['ventas/catalogodocumentodeventa-cotizacion/cotizacion']);

    }
  }

}
export class Item {
  coditem = '';
  NomItem = '';
  Precio = 0;
}
