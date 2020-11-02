import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../CategoriaService.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})

export class CrearCategoriaComponent implements OnInit {
 
lstCategorias: any [] = [];
loading = false;
formcategoria: FormGroup;

  constructor(private categoriaServicio:CategoriaService,
    private formbuilder: FormBuilder) {
      this.buildForm();
     }

  ngOnInit(): void {
  }
  guardarCategoria(event: Event){
    event.preventDefault();
    const value = this.formcategoria.value;
    console.log(value);
  }
  private buildForm(){
   
    this.formcategoria = this.formbuilder.group({
      codfamilia: ['',[Validators.required]],
      nomfamilia:['',[Validators.required]],
      status: ['0',[Validators.required]]
      
    })
  }
}
