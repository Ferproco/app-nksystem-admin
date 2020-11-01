import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmacenService } from '../AlmacenService.service';

@Component({
  selector: 'app-crear-almacen',
  templateUrl: './crear-almacen.component.html',
  styleUrls: ['./crear-almacen.component.css']
})
export class CrearAlmacenComponent implements OnInit {
 
  lstAlmacenes: any [] = [];
  loading = false;
  formalmacen: FormGroup;
  constructor(private almacenServicio:AlmacenService,
    private formbuilder: FormBuilder) { 
      this.buildForm();
    }

  ngOnInit(): void {
  }
  guardarAlmacen(event: Event){
    event.preventDefault();
    const value = this.formalmacen.value;
    console.log(value);
  }
  private buildForm(){
   
    this.formalmacen = this.formbuilder.group({
      idalmacen: ['',[Validators.required]],
      nombre:['',[Validators.required]],
      direccion: ['0',[Validators.required]]
      
    })
  }

}
