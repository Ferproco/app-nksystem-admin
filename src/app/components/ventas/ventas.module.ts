import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentoVentasComponent } from './documento-ventas/documento-ventas.component';
import { CatalogoDocumentoVentasComponent } from './catalogo-documento-ventas/catalogo-documento-ventas.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

import { MatMenuModule } from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ContactoService } from '../portafolio/contacto/ContactoService.service';
import { VendedorService } from '../portafolio/vendedor/VendedorService.service';
import { AlmacenService } from '../portafolio/almacen/AlmacenService.service';
import { Articulo } from '../model/Articulo.model';
import { ArticuloService } from '../portafolio/articulo/ArticuloService.service';


@NgModule({
  declarations: [
    VentasComponent,
    DocumentoVentasComponent,
    CatalogoDocumentoVentasComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  providers: [
   
    ContactoService,
    VendedorService,
    AlmacenService,
    ArticuloService
  ]
})
export class VentasModule { }
