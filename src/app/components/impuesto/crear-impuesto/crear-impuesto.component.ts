import { ImpuestoService } from './../ImpuestoService.service';
import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TipoImpuestoService } from '../TipoImpuestoService.service';

@Component({
  selector: 'app-crear-impuesto',
  templateUrl: './crear-impuesto.component.html',
  styleUrls: ['./crear-impuesto.component.css']
})
export class CrearImpuestoComponent implements OnInit {

  idimpuesto = 0;
  lstTipoImpuestos: any [] = [];
  loading = false;
  formimpuesto: FormGroup;



  constructor(private tipoimpuestoServicio: TipoImpuestoService,
              private impuestoService: ImpuestoService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService) {

    this.buildForm();
  }

  ngOnInit(): void {
    this.listarTipoImpuestos();
  }

  guardarImpuesto(event: Event){
    event.preventDefault();
    const value = this.formimpuesto.value;
    console.log(value);

    this.toastr.info('Falta Informacion requerida', 'Informacion', { enableHtml: true, closeButton: true });
    this.impuestoService.guardarImpuesto(this.idimpuesto, value)
    .subscribe(response => {
      console.log(response);
    });
  }

  listarTipoImpuestos(){
    this.loading = true;
    this.tipoimpuestoServicio.listarTipoImpuestos('')
      .subscribe(response => {
        this.lstTipoImpuestos = response as any[];
        console.log(this.lstTipoImpuestos);
        this.loading = false;
      });
  }
  private buildForm(){

    this.formimpuesto = this.formbuilder.group({
      nombreimpuesto: ['', [Validators.required]],
      normal: ['0', [Validators.required]],
      fechaini: [new Date(), [Validators.required]],
      idtipoimpuesto: ['0', [Validators.required]],
      status: ['1', [Validators.required]]

    });
  }

}
