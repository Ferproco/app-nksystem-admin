

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegistrarseComponent } from './components/login/registrarse/registrarse.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// RECOMMENDED
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { GrupoArticuloService } from './components/grupoarticulo/GrupoArticuloService.service';
import { MovimientosCajaService } from './components/movimientoscaja/MovimientosCajaService.service';
import { CatalogoMovimientoscajaComponent } from './components/movimientoscaja/catalogo-movimientoscaja/catalogo-movimientoscaja.component';
import { ProveedorService } from './components/proveedor/ProveedorService.service';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { CatalogoProveedorComponent } from './components/proveedor/catalogo-proveedor/catalogo-proveedor.component';
import { FilterProveedorPipe } from './components/proveedor/catalogo-proveedor/filter-proveedor.pipe';
import { CuentasxcobrarComponent } from './components/ventas/cuentasxcobrar/cuentasxcobrar.component';
import { CatalogoTransaccionesComponent } from './components/transacciones/catalogo-transacciones/catalogo-transacciones.component';
import { TransaccionesService } from './components/transacciones/TransaccionesService.service';
import { FilterTransaccionesPipe } from './components/transacciones/catalogo-transacciones/filter-transacciones.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DepartamentoService } from './components/departamento/DepartamentoService.service';
import { MunicipioService } from './components/municipio/MunicipioService.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ListaPrecioService } from './components/listapeccio/ListaPrecioService.service';
import { MensajeEliminarComponent } from './components/mensajeria/mensaje-eliminar/mensaje-eliminar.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import * as accordion from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentosVentasService } from './components/ventas/documentos-ventas.service';
import { DocumentosComprasComponent } from './components/compras/documentos-compras/documentos-compras.component';
import { CatalogoDocumentosComprasComponent } from './components/compras/catalogo-documentos-compras/catalogo-documentos-compras.component';
import { DocumentoCompraService } from './components/compras/DocumentoCompraService.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarseComponent,
    CatalogoMovimientoscajaComponent,
    CrearProveedorComponent,
    CatalogoProveedorComponent,
    FilterProveedorPipe,
    CuentasxcobrarComponent,
    CatalogoTransaccionesComponent,
    FilterTransaccionesPipe,
    MensajeEliminarComponent,
   // DocumentosComprasComponent
   // CatalogoDocumentosComprasComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    MatSlideToggleModule,
    MatProgressBarModule

  ],
  providers: [
    GrupoArticuloService,
    MovimientosCajaService,
    ProveedorService,
    TransaccionesService,
    DepartamentoService,
    MunicipioService,
    ListaPrecioService,
    DocumentosVentasService,
    DocumentoCompraService,
    BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
