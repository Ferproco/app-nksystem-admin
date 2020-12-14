import { ModalClienteComponent } from '../../contacto/modal-cliente/modal-cliente.component';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CrearFormapagoModalComponent } from '../../formapago/crear-formapago-modal/crear-formapago-modal.component';
import { FormaPagoService } from '../../formapago/FormaPagoService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { VendedorService } from '../../vendedor/VendedorService.service';

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

  constructor(private modalService: BsModalService,
              private formaPagoService: FormaPagoService,
              private vendedorService: VendedorService,
              private toastr: ToastrService) {

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
  }

  ngOnInit(): void {
    this.listarVendedores();
    this.listarFormasdepago();
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

}
