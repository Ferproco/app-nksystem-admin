import { ModalClienteComponent } from '../../contacto/modal-cliente/modal-cliente.component';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CrearFormapagoModalComponent } from '../../formapago/crear-formapago-modal/crear-formapago-modal.component';
import { FormaPagoService } from '../../formapago/FormaPagoService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { VendedorService } from '../../vendedor/VendedorService.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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

  allTeamDetails: any [] = [
    {coditem: '00001', nombre: 'Elemento 1'}
  ];

  DocumentoVentaForm: FormGroup;
  itemDetails: FormArray;

  tipodocumento: string = '';
  titulo: string = '';
  url: string = '';

  constructor(private modalService: BsModalService,
              private formaPagoService: FormaPagoService,
              private vendedorService: VendedorService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {


    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    if (this.route.snapshot.params.tipodocumento){
      this.tipodocumento = this.route.snapshot.params.tipodocumento;

    }

  }

  ngOnInit(): void {

    this.onTipoDocumento(this.tipodocumento);
    this.DocumentoVentaForm = this.formBuilder.group({
      numerodocumento: ['00001', [Validators.required, Validators.maxLength(10)]],
      fechaemision: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      fechavence: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      codvendedor: [null, [Validators.required, Validators.maxLength(10)]],
      codformapago: [null, [Validators.required, Validators.maxLength(10)]],
      nombreprimero: ['', [Validators.required, Validators.maxLength(100)]],
      direccionfiscal:  ['', [Validators.required, Validators.maxLength(100)]],
      itemDetails: this.formBuilder.array([this.formBuilder.group({codigo: '', descripcion: '', price: ''})])
    });

    this.listarVendedores();
    this.listarFormasdepago();
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
    return this.DocumentoVentaForm.get("itemDetails") as FormArray
  }


  onFormSubmit(event: Event){
    event.preventDefault();
    let data = JSON.stringify(this.DocumentoVentaForm.value);
    console.log('-----Team in JSON Format-----');
    console.log(data);
  }

  onListarClientes(){

    const config: ModalOptions = { class: 'modal-lg' };
    this.bsModalRef = this.modalService.show(ModalClienteComponent, config);
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);

    });
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

}

export class Item {
  coditem = '';
  NomItem = '';
  Precio = 0;
}
