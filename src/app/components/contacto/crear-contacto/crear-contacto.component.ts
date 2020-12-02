import { FormaPagoService } from './../../formapago/FormaPagoService.service';
import { TipoContribuyenteService } from './TipoContribuyenteService.service';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactoService } from '../ContactoService.service';
import { TipoIdentificacionService } from './TipoIdentificacionService.service';
import { VendedorService } from '../../vendedor/VendedorService.service';
import { PaisService } from './PaisService.service';
import { DepartamentoService } from '../../departamento/DepartamentoService.service';
import { MunicipioService } from '../../municipio/MunicipioService.service';
import { ListaPrecioService } from '../../listapeccio/ListaPrecioService.service';
import { CrearFormapagoModalComponent } from '../../formapago/crear-formapago-modal/crear-formapago-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


export interface Tipopersona{
  id: number;
  nombre: string;

}

@Component({
  selector: 'app-crear-contacto',
  templateUrl: './crear-contacto.component.html',
  styleUrls: ['./crear-contacto.component.css']
})

export class CrearContactoComponent implements OnInit {
  
  radioModel = 'Middle';
  uncheckableRadioModel = 'Middle';

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();
  
  id = 0;
  loading = false;
  formcontacto: FormGroup;
  lstTipoIdentificacion: any [] = [];
  lstTipoContribuyente: any [] = [];
  lstVendedores: any [] = [];
  lstformaspago: any [] = [];
  lstPais: any [] = [];
  lstDepartamentos: any [] = [];
  lstMunicipios: any [] = [];
  idnegocio: number;
  lstListaprecios: any [] = [];
  arreglonumeros:number [] = [41,37, 29, 23, 19,17, 13, 7,3];

  paisxdefecto = 48;
  vendedorxdefecto=1;
  listaprecioxdefecto=1;
  plazocreditoxdefecto=1;
  tipopersonaxdefecto=2;
  condicionadoxdefecto=0;
    
  visible = true;
  visiblenombres=false;
  visiblerazonsocial=true;
  visibleresponsabilidadtributaria=true;
  visibledepartamento=true;
  visiblemunicipio=true;
  visiblecodigodv=false;

  
  

  tipopersona: Tipopersona[] = [
    {id: 1, nombre: 'Persona Natural'},
    {id: 2, nombre: 'Persona Juridica'}
  ]

  

  saleData = [
    { name: "Compras", value: 105000 },
    { name: "Ventas", value: 55000 }
  ];

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;
  bsModalRef: any;

  customClass = 'customClass';
  isFirstOpen = true;

  constructor(private contactoServicio: ContactoService,
              private tipoidentificacionServicio: TipoIdentificacionService,
              private tipocontribuyenteServicio: TipoContribuyenteService,
              private formaPagoService: FormaPagoService,
              private vendedorService: VendedorService,
              private paisService: PaisService,
              private departamentoService: DepartamentoService,
              private municipioServicio: MunicipioService,
              private listaprecioServicio:ListaPrecioService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private modalService: BsModalService) {
      this.buildForm();
      this.idnegocio = 1;
      this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    }

  ngOnInit(): void {
    this.listarTipoIdentificacion();
    this.listarTipoContribuyente();
    this. listarVendedores();
    this.listarFormasdepago();
    this.listarPais();   
    
    this.listarListaPrecios();

  }

  guardarContacto(event: Event){
    event.preventDefault();
    this.loading = true;
    const value = this.formcontacto.value;
    this.contactoServicio.guardarContacto(this.id, this.idnegocio, value)
    .subscribe(response => {
      this.loading = false;
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.router.navigate(['contactos/listarcontactos']);
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

  listarTipoIdentificacion() {
    this.loading = true;
    this.tipoidentificacionServicio.listarTipoIdentificaciones('')
      .subscribe(response => {
        this.lstTipoIdentificacion = response as any[];
        console.log(this.lstTipoIdentificacion);
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

  listarTipoContribuyente() {
    this.loading = true;
    this.tipocontribuyenteServicio.listarTipoContribuyente('')
      .subscribe(response => {
        this.lstTipoContribuyente = response as any[];
        console.log(this.lstTipoContribuyente);
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
  listarDepartamentos(event) {
    this.loading = true;
    this.lstDepartamentos = [];
    this.lstMunicipios = [];
    console.log('el id del pais ' + event );
    this.departamentoService.listarDepartamentosporPais('', Number(event))
      .subscribe(response => {
        this.lstDepartamentos = response as any[];
        console.log(this.lstDepartamentos);
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

 
  listarMunicipios (event) {
    this.loading = true;
    this.lstMunicipios = [];
    
    console.log('el id del departamento ' + event );
    this.municipioServicio.listarMunicipiosporDepartamento('', Number(event))
      .subscribe(response => {
        this.lstMunicipios = response as any[];
        console.log(this.lstMunicipios);
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
  listarPais() {
    this.loading = true;
    this.paisService.listarPais('')
      .subscribe(response => {
        this.lstPais = response as any[];
        console.log(this.lstPais);
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
  listarListaPrecios() {
    this.loading = true;
    this.listaprecioServicio.listarListaPrecios('')
      .subscribe(response => {
        this.lstListaprecios = response as any[];
        console.log(this.lstListaprecios);
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

  MostrarCampos(event){
    const idtipo = Number(event);
    if (idtipo === 6){
      this.visible = true;
      this.visiblenombres = false;
      this.visiblerazonsocial=true;
      this.visibleresponsabilidadtributaria=true;
      this.visiblemunicipio=true;
      this.visibledepartamento=true;
      this.visiblecodigodv=true;

    }
    else if (idtipo === 4 || idtipo === 5 || idtipo === 8){

      this.visible = true;
      this.visiblenombres = true;
      this.visiblerazonsocial=false;
      this.visibleresponsabilidadtributaria=true;
      this.visiblemunicipio=false;
      this.visibledepartamento=false;
      this.visiblecodigodv=false;

    }
    else{
      this.visible = true;
      this.visiblenombres = true;
      this.visiblerazonsocial=false;
      this.visibleresponsabilidadtributaria=true;
      this.visiblemunicipio=true;
      this.visibledepartamento=true;
      this.visiblecodigodv=false;
    }

  }
  MostrarCamposTipoPresona(event){
    const idtipo = Number(event);
    if (idtipo === 1){
      this.visiblenombres = true;
      this.visiblerazonsocial=false;
      this.visibleresponsabilidadtributaria=true;
    }
    else{
      this.visiblenombres = false;
      this.visiblerazonsocial=true;
      this.visibleresponsabilidadtributaria=true;
    }

  }

  private buildForm(){
    this.formcontacto = this.formbuilder.group({
      codtipocontibuyente: [null, [Validators.required]],
      codtipoidentificacion: [null, [Validators.required]],
      numeroidentificacion: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      nombreprimero: ['', [Validators.pattern(this.parrterobservaciones)]],
      nombresegundo: ['', [Validators.pattern(this.parrterobservaciones)]],
      apellidoprimero: ['', [Validators.pattern(this.parrterobservaciones)]],
      apellidosegundo: ['', [Validators.pattern(this.parrterobservaciones)]],
      razonsocial: ['', [Validators.pattern(this.parrterobservaciones)]],
      telefonomovil: ['', [Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofijo1: ['', [Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofijo2: ['', [Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofax: ['', [Validators.pattern(this.patten), Validators.maxLength(15)]],
      direccionfiscal: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      correoe: ['', [Validators.pattern(this.parrterobservaciones)]],
      fecharegistro: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      codtipocontacto: [0, [Validators.required]],
      codvendedor: [this.vendedorxdefecto, [Validators.required]],
      codformapago: [this.plazocreditoxdefecto, [Validators.required]],
      codtipopersona:[this.tipopersonaxdefecto, [Validators.required]],
      codpais:[this.paisxdefecto],
      coddepartamento:[null],
      codmunicipio:[null],
      lugarenvio: ['', [Validators.pattern(this.parrterobservaciones)]],
      cupo: ['', [ Validators.pattern(this.parrterobservaciones)]],
      codlistaprecio:[this.listaprecioxdefecto, [Validators.required]],
      direccionexogena:['', [Validators.pattern(this.parrterobservaciones)]],
      paginaweb: ['', [Validators.pattern(this.parrterobservaciones)]],
      limitecreditohasta: ['', [ Validators.pattern(this.parrterobservaciones)]],
      fechacreditodesde:[formatDate(new Date(), 'yyyy-MM-dd', 'en')],
      fechacreditohasta:[formatDate(new Date(), 'yyyy-MM-dd', 'en')],
      observaciones: ['', [Validators.pattern(this.parrterobservaciones)]],
      descuentocondicionado: ['No', [Validators.pattern(this.parrterobservaciones)]],
      codigodv:[this.condicionadoxdefecto, [Validators.pattern(this.paterhombre)]],
      responsableiva: ['No', [Validators.required]],
      status: ['1', [Validators.required]]
    });
  }

  CalcularDigitoVerficacion(event){
    
    const arreglonumeroidentificacion = event;
    let resultadomultiplicacion = 0;  
    let sumaresultadomultiplicacion = 0; 
    const divisionnumero=11;
    let resultadodivision = 0;
    let posicionarreglo1=0; 
    let posicionarreglo2=0;

         for (let numero of this.arreglonumeros){
          console.log('Primer arreglo ' + numero);
          posicionarreglo1= posicionarreglo1 + 1;
          posicionarreglo2=0;
           for (let element of arreglonumeroidentificacion){

             posicionarreglo2=posicionarreglo2 + 1;;
             console.log('Primera posicion ' + posicionarreglo1);
             console.log('Segunda posicion ' + posicionarreglo2);
             console.log('Segundo for ' + Number(element));
             if(posicionarreglo1===posicionarreglo2){
              resultadomultiplicacion=numero * element;
              console.log('Resultado de la multiplicacion es ' + Number(resultadomultiplicacion));
              sumaresultadomultiplicacion=sumaresultadomultiplicacion+resultadomultiplicacion;
             }
             console.log('Resultado de la suma es ' + Number(sumaresultadomultiplicacion));
           };
           
        }
        resultadodivision=sumaresultadomultiplicacion/divisionnumero;
        console.log('Resultado de la suma es ' + Number(resultadodivision));
        let parteDecimal = resultadodivision % 1; // Lo que sobra de dividir al número entre 1
        let parteEntera = resultadodivision - parteDecimal; 
        console.log('Resultado de la parteDecimal es ' + Number(parteDecimal));
        console.log('Resultado de la parteEntera es ' + Number(parteEntera));
        let resultado=parteDecimal * divisionnumero;
        console.log('Resultado  es ' + Number(resultado));
        let resultadofinal = Math.round(resultado);
        console.log('Resultado final  es ' + Number(resultadofinal));
        this.formcontacto.get('codigodv').setValue(Number(resultadofinal));
        this.condicionadoxdefecto=resultadofinal;
  }
  get codtipocontibuyente(){
    return this.formcontacto.get('codtipocontibuyente');
  }
  get codtipopersona(){
    return this.formcontacto.get('codtipopersona');
  }
  get nombreprimero() {
    return this.formcontacto.get('nombreprimero');
  }
  get nombresegundo() {
    return this.formcontacto.get('nombresegundo');
  }
  get apellidoprimero() {
    return this.formcontacto.get('apellidoprimero');
  }
  get apellidosegundo() {
    return this.formcontacto.get('apellidosegundo');
  }
  get numeroidentificacion() {
    return this.formcontacto.get('numeroidentificacion');
  }
  get direccionfiscal() {
    return this.formcontacto.get('direccionfiscal');
  }
  get telefonofijo1() {
    return this.formcontacto.get('telefonofijo1');
  }
  get telefonofijo2() {
    return this.formcontacto.get('telefonofijo2');
  }
  get telefonofax() {
    return this.formcontacto.get('telefonofax');
  }
  get telefonomovil() {
    return this.formcontacto.get('telefonomovil');
  }
  get correoe(){
    return this.formcontacto.get('correoe');
  }
  get razonsocial(){
    return this.formcontacto.get('razonsocial');
  }
  get limitecreditohasta(){
    return this.formcontacto.get('limitecreditohasta');
  }
  
  get lugarenvio(){
    return this.formcontacto.get('lugarenvio');
  }
  get direccionexogena(){
    return this.formcontacto.get('direccionexogena');
  }
  get observaciones(){
    return this.formcontacto.get('observaciones');
  }
  get paginaweb(){
    return this.formcontacto.get('paginaweb');
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
  
 

  

}
