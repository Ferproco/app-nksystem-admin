import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoImpuestoService } from '../TipoImpuestoService.service';

@Component({
  selector: 'app-crear-impuesto',
  templateUrl: './crear-impuesto.component.html',
  styleUrls: ['./crear-impuesto.component.css']
})
export class CrearImpuestoComponent implements OnInit {
  lstTipoImpuestos: any [] = [];
  loading = false;
  formimpuesto: FormGroup;
  
  constructor(private tipoimpuestoServicio:TipoImpuestoService,
              private formbuilder: FormBuilder) {

                this.buildForm();
               }

  ngOnInit(): void {
    this.listarTipoImpuestos();
  }

 
  guardarImpuesto(event: Event){
    event.preventDefault();
    const value = this.formimpuesto.value;
    console.log(value);
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
      codigo: ['',[Validators.required]],
      nombre:['',[Validators.required]],
      tipoimpuesto: ['0',[Validators.required]]
      
    })
  }

}
