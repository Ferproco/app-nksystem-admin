
import { CrearImpuestoComponent } from './components/impuesto/crear-impuesto/crear-impuesto.component';
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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// RECOMMENDED
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { GrupoArticuloService } from './components/grupoarticulo/GrupoArticuloService.service';
import { ImpuestoService } from './components/impuesto/ImpuestoService.service';
import { TipoImpuestoService } from './components/impuesto/TipoImpuestoService.service';
import { UnidadService } from './components/unidadmedida/UnidadService.service';
import { MarcaService } from './components/marca/MarcaService.service';
import { CatalogoImpuestoComponent } from './components/impuesto/catalogo-impuesto/catalogo-impuesto.component';
import { CatalogoUsuarioComponent } from './components/configuracion/catalogo-usuario/catalogo-usuario.component';
import { FormaPagoService } from './components/formapago/FormaPagoService.service';
import { CatalogoFormapagoComponent } from './components/formapago/catalogo-formapago/catalogo-formapago.component';
import { CrearFormapagoComponent } from './components/formapago/crear-formapago/crear-formapago.component';
import { FilterFormapagoPipe } from './components/formapago/catalogo-formapago/filter-formapago.pipe';
import { MovimientosCajaService } from './components/movimientoscaja/MovimientosCajaService.service';
import { CatalogoMovimientoscajaComponent } from './components/movimientoscaja/catalogo-movimientoscaja/catalogo-movimientoscaja.component';
import { ProveedorService } from './components/proveedor/ProveedorService.service';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { CatalogoProveedorComponent } from './components/proveedor/catalogo-proveedor/catalogo-proveedor.component';
import { FilterProveedorPipe } from './components/proveedor/catalogo-proveedor/filter-proveedor.pipe';
import { CuentasxcobrarComponent } from './components/ventas/cuentasxcobrar/cuentasxcobrar.component';
import { CatalogoUnidadmedidaComponent } from './components/unidadmedida/catalogo-unidadmedida/catalogo-unidadmedida.component';
import { FilterUnidadmedidaPipe } from './components/unidadmedida/catalogo-unidadmedida/filter-unidadmedida.pipe';
import { CatalogoTransaccionesComponent } from './components/transacciones/catalogo-transacciones/catalogo-transacciones.component';
import { TransaccionesService } from './components/transacciones/TransaccionesService.service';
import { FilterTransaccionesPipe } from './components/transacciones/catalogo-transacciones/filter-transacciones.pipe';

import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { DepartamentoService } from './components/departamento/DepartamentoService.service';
import { MunicipioService } from './components/municipio/MunicipioService.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ListaPrecioService } from './components/listapeccio/ListaPrecioService.service';
import { MensajeEliminarComponent } from './components/mensajeria/mensaje-eliminar/mensaje-eliminar.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import * as accordion from 'ngx-bootstrap/accordion';
import { CrearTipoImpuestoModalComponent } from './components/tipoimpuesto/crear-tipo-impuesto-modal/crear-tipo-impuesto-modal.component';
import { CatalogoTipoImpuestoComponentComponent } from './components/tipoimpuesto/catalogo-tipo-impuesto-component/catalogo-tipo-impuesto-component.component';
import { CrearTipoImpuestoComponentComponent } from './components/tipoimpuesto/crear-tipo-impuesto-component/crear-tipo-impuesto-component.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentosVentasService } from './components/ventas/documentos-ventas.service';
import { CrearMarcaComponent } from './components/marca/crear-marca/crear-marca.component';
import { CatalogoMarcaComponent } from './components/marca/catalogo-marca/catalogo-marca.component';
import { DocumentosComprasComponent } from './components/compras/documentos-compras/documentos-compras.component';
import { CatalogoDocumentosComprasComponent } from './components/compras/catalogo-documentos-compras/catalogo-documentos-compras.component';
import { DocumentoCompraService } from './components/compras/DocumentoCompraService.service';
import { CrearImpuestoModalComponent } from './components/impuesto/crear-impuesto-modal/crear-impuesto-modal.component';
import { CatalogoNumeraciondocumentoComponent } from './components/configuracion/catalogo-numeraciondocumento/catalogo-numeraciondocumento.component';
import { NumeracionDocumentoService } from './components/configuracion/NumeracionDocumentoService.service';
import { CrearNumeraciondocumentoComponent } from './components/configuracion/crear-numeraciondocumento/crear-numeraciondocumento.component';
import { TipoDocumentoService } from './components/tipodocumento/tipodocumentoService.service';
import { CrearNumeraciondocumentoModalComponent } from './components/configuracion/crear-numeraciondocumento-modal/crear-numeraciondocumento-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarseComponent,
    CatalogoImpuestoComponent,
    CrearImpuestoComponent,
    CatalogoUsuarioComponent,
    CatalogoFormapagoComponent,
    CrearFormapagoComponent,
    FilterFormapagoPipe,
    CatalogoMovimientoscajaComponent,
    CrearProveedorComponent,
    CatalogoProveedorComponent,
    FilterProveedorPipe,
    CuentasxcobrarComponent,
    CatalogoUnidadmedidaComponent,
    FilterUnidadmedidaPipe,
    CatalogoTransaccionesComponent,
    FilterTransaccionesPipe,
    MensajeEliminarComponent,
    CrearTipoImpuestoModalComponent,
    CatalogoTipoImpuestoComponentComponent,
    CrearTipoImpuestoComponentComponent,
    CrearMarcaComponent,
    CatalogoMarcaComponent,
    DocumentosComprasComponent,
    CatalogoDocumentosComprasComponent,
    CrearImpuestoModalComponent,
    CatalogoNumeraciondocumentoComponent,
    CrearNumeraciondocumentoComponent,
    CrearNumeraciondocumentoModalComponent,
  

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
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    MatSlideToggleModule

  ],
  providers: [
    GrupoArticuloService,
    ImpuestoService,
    TipoImpuestoService,
    MarcaService,
    UnidadService,
    FormaPagoService,
    MovimientosCajaService,
    ProveedorService,
    TransaccionesService,
    DepartamentoService,
    MunicipioService,
    ListaPrecioService,
    DocumentosVentasService,
    DocumentoCompraService,
    NumeracionDocumentoService,
    TipoDocumentoService,
    BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
