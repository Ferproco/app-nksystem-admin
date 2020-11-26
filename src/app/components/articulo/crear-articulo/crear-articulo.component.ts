import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FamiliaService } from '../../familia/FamiliaService.service';
import { GrupoArticuloService } from '../../grupoarticulo/GrupoArticuloService.service';
import { ImpuestoService } from '../../impuesto/ImpuestoService.service';
import { MarcaService } from '../../marca/MarcaService.service';
import { UnidadService } from '../../unidadmedida/UnidadService.service';
import { ArticuloService } from '../ArticuloService.service';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {

  id = 0;
  loading = false;
  lstFamilias: any [] = [];
  lstUnidades: any [] = [];
  lstImpuestos: any [] = [];
  lstMarcas: any[]=[];
  lstGrupoArticulos:any[]=[];
  
  idnegocio: number;
  formarticulo: FormGroup;

  unidadmedidaxdefecto:2;

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor(private articuloservice:ArticuloService,
              private familiaserive: FamiliaService,
              private unidadservice: UnidadService,
              private impuestoservice:ImpuestoService,
              private marcaservice:MarcaService,
              private grupoarticuloservice:GrupoArticuloService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {

    this.buildForm();
    this.idnegocio = 1;
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
      unidadmedida: [this.unidadmedidaxdefecto,[Validators.required]],
      impuesto:['0',[Validators.required]],
      marca:['0',[Validators.required]],
      grupoarticulo:['0',[Validators.required]]
    })
  }

  guardarArticulo(event: Event){
    event.preventDefault();
    this.loading = true;
    const value = this.formarticulo.value;
    this.articuloservice.guardarArticlo(this.id, this.idnegocio, value)
    .subscribe(response => {
      this.loading = false;
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.router.navigate(['inventario/listararticulos']);
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

  listarFamilias(){
    this.loading = true;
    this.familiaserive.listarFamilias('')
      .subscribe(response => {
        this.lstFamilias = response as any[];
        console.log(this.lstFamilias);
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

  listarUnidades(){
    this.loading = true;
    this.unidadservice.listarUnidades('')
      .subscribe(response => {
        this.lstUnidades = response as any[];
        console.log(this.lstUnidades);
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
  listarImpuestos(){
    this.loading = true;
    this.impuestoservice.listarImpuestos('')
      .subscribe(response => {
        this.lstImpuestos = response as any[];
        console.log(this.lstImpuestos);
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
  listarMarcas(){
    this.loading = true;
    this.marcaservice.listarMarcas('')
      .subscribe(response => {
        this.lstMarcas = response as any[];
        console.log(this.lstMarcas);
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
  listarGrupoArticulos(){
    this.loading = true;
    this.grupoarticuloservice.listarGrupoArticulos('')
      .subscribe(response => {
        this.lstGrupoArticulos = response as any[];
        console.log(this.lstGrupoArticulos);
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
  get codigo(){
    return this.formarticulo.get('codigo');
  }
  get nombre(){
    return this.formarticulo.get('nombre');
  }
}
