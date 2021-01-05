import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NumeracionDocumento } from '../../model/NumeracionDocumento.model';
import { NumeracionDocumentoService } from '../NumeracionDocumentoService.service';

@Component({
  selector: 'app-crear-numeraciondocumento-modal',
  templateUrl: './crear-numeraciondocumento-modal.component.html',
  styleUrls: ['./crear-numeraciondocumento-modal.component.css']
})
export class CrearNumeraciondocumentoModalComponent implements OnInit {
  public onClose: Subject<boolean>;
  idnumeraciondocumento = 0;
  lstNumeracionDocumentos: any [] = [];
  loading = false;
  formnumeraciondocumento: FormGroup;
  idnegocio: number;
  NumeracionDocumentoModel: NumeracionDocumento;
  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  //bsModalRef: BsModalRef;

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;
  constructor(private numeraciondocumentoService: NumeracionDocumentoService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService) {
     

      this.NumeracionDocumentoModel = new NumeracionDocumento();
      this.idnegocio = 1;
  
      this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
      if (this.route.snapshot.params.id) {
        this.idnumeraciondocumento = this.route.snapshot.params.id;
       // this.buscarArticulo(this.id);
      }
      this.buildForm();
     }

  ngOnInit(): void {
   // this.listarTipoImpuestos();
    this.onClose = new Subject();
  }
  guardarNumeracionDocumento(event: Event){
    event.preventDefault();
    this.loading = true;
    const value = this.formnumeraciondocumento.value;
    this.numeraciondocumentoService.guardarNumeracionDocumento(this.idnumeraciondocumento, this.idnegocio, value)
    .subscribe(response => {
      this.loading = false;
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      //this.router.navigate(['configuracion/listarnumeraciondocumentos']);
      this.onClose.next(true);
      this.bsModalRef.hide();
    },
    ((error: HttpErrorResponse) => {
      this.loading = false;
      console.log('Error ' + error);
      this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio  ' + '<br>' + error.message, 'Error',
      { enableHtml: true, closeButton: true });
    }));
  }

 
  private buildForm(){
    this.formnumeraciondocumento = this.formbuilder.group({
      nombre: [this.NumeracionDocumentoModel.nombre, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      proximonumerodocumento: [this.NumeracionDocumentoModel.proximonumerodocumento, [Validators.required, Validators.pattern(this.paterhombre)]],
      desdenumero: [this.NumeracionDocumentoModel.desdenumero, [Validators.required, Validators.pattern(this.paterhombre)]],
      hastanumero: [this.NumeracionDocumentoModel.hastanumero, [Validators.required, Validators.pattern(this.paterhombre)]],
      prefijo: [this.NumeracionDocumentoModel.prefijo, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      codtipodocumento: [this.NumeracionDocumentoModel.codtipodocumento, [Validators.required]],
      resolucion: [this.NumeracionDocumentoModel.resolucion, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      status: [this.NumeracionDocumentoModel.status === 'ACTIVO' ? 1 : 0]

    });
  }
  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
  


 
  onCrearNumeracionDocumento(){
    this.bsModalRef = this.modalService.show(CrearNumeraciondocumentoModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      if (result){
        //this.listarTipoImpuestos();
      }

    });
  }
}
