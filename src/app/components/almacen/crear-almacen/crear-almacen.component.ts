import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlmacenService } from '../AlmacenService.service';

@Component({
  selector: 'app-crear-almacen',
  templateUrl: './crear-almacen.component.html',
  styleUrls: ['./crear-almacen.component.css']
})
export class CrearAlmacenComponent implements OnInit {
  id = 0;
  lstAlmacenes: any [] = [];
  loading = false;
  formalmacen: FormGroup;
  constructor(private almacenServicio:AlmacenService,
    private formbuilder: FormBuilder,private toastr: ToastrService) { 
      this.buildForm();
    }

  ngOnInit(): void {
  }
  guardarAlmacen(event: Event){
    event.preventDefault();
    const value = this.formalmacen.value;
    console.log(value);

    this.toastr.info('Falta Informacion requerida', 'Informacion', { enableHtml: true, closeButton: true });
    this.almacenServicio.guardarAlmacen(this.id, value)
    .subscribe(response => {
      console.log(response);
    });
  }
  private buildForm(){
   
    this.formalmacen = this.formbuilder.group({
     
      nombre: ['',[Validators.required]],
      direccion: ['',[Validators.required]],
      status: ['',[Validators.required]],
      principal:['',[Validators.required]]
      
    })
  }

}
