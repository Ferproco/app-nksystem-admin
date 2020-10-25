import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FamiliaService } from '../../familia/FamiliaService.service';
import { GrupoArticuloService } from '../../grupoarticulo/GrupoArticuloService.service';
import { ImpuestoService } from '../../impuesto/ImpuestoService.service';
import { MarcaService } from '../../marca/MarcaService.service';
import { UnidadService } from '../../unidadmedida/UnidadService.service';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {

  lstFamilias: any [] = [];
  lstUnidades: any [] = [];
  lstImpuestos: any [] = [];
  lstMarcas: any[]=[];
  lstGrupoArticulos:any[]=[];
  loading = false;
  formarticulo: FormGroup;

  constructor(private familiaserive: FamiliaService,
              private unidadservice: UnidadService,
              private impuestoservice:ImpuestoService,
              private marcaservice:MarcaService,
              private grupoarticuloservice:GrupoArticuloService,
              private formbuilder: FormBuilder) {

    this.buildForm();
   }

  ngOnInit(): void {
    this.listarFamilias();
    this.listarUnidades();
    this.listarImpuestos();
    this.listarMarcas();
    this.listarGrupoArticulos();
  }

  private buildForm(){
   
    this.formarticulo = this.formbuilder.group({
      codigo: ['',[Validators.required]],
      nombre:['',[Validators.required]],
      tipoproducto: ['0',[Validators.required]],
      unidadmedida: ['0',[Validators.required]],
      impuesto:['0',[Validators.required]],
      marca:['0',[Validators.required]],
      grupoarticulo:['0',[Validators.required]]
    })
  }

  guardarArticulo(event: Event){
    event.preventDefault();
    const value = this.formarticulo.value;
    console.log(value);
  }

  listarFamilias(){
    this.loading = true;
    this.familiaserive.listarFamilias('')
      .subscribe(response => {
        this.lstFamilias = response as any[];
        console.log(this.lstFamilias);
        this.loading = false;
      });
  }

  listarUnidades(){
    this.loading = true;
    this.unidadservice.listarUnidades('')
      .subscribe(response => {
        this.lstUnidades = response as any[];
        console.log(this.lstUnidades);
        this.loading = false;
      });
  }
  listarImpuestos(){
    this.loading = true;
    this.impuestoservice.listarImpuestos('')
      .subscribe(response => {
        this.lstImpuestos = response as any[];
        console.log(this.lstImpuestos);
        this.loading = false;
      });
  }
  listarMarcas(){
    this.loading = true;
    this.marcaservice.listarMarcas('')
      .subscribe(response => {
        this.lstMarcas = response as any[];
        console.log(this.lstMarcas);
        this.loading = false;
      });
  }
  listarGrupoArticulos(){
    this.loading = true;
    this.grupoarticuloservice.listarGrupoArticulos('')
      .subscribe(response => {
        this.lstGrupoArticulos = response as any[];
        console.log(this.lstGrupoArticulos);
        this.loading = false;
      });
  }

}
