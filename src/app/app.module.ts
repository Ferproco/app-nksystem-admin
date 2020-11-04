import { MatDatepickerModule } from '@angular/material/datepicker';
import { CrearImpuestoComponent } from './components/impuesto/crear-impuesto/crear-impuesto.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogoArticuloComponent } from './components/articulo/catalogo-articulo/catalogo-articulo.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticuloService } from './components/articulo/ArticuloService.service';
import { LoginComponent } from './components/login/login.component';
import { RegistrarseComponent } from './components/login/registrarse/registrarse.component';
import { MainComponent } from './components/main/main.component';
import { FilterArticuloPipe } from './components/articulo/catalogo-articulo/filter-articulo.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CrearArticuloComponent } from './components/articulo/crear-articulo/crear-articulo.component';
import { ClienteService } from './components/cliente/ClienteService.service';
import { FamiliaService } from './components/familia/FamiliaService.service';
import { GrupoArticuloService } from './components/grupoarticulo/GrupoArticuloService.service';
import { ImpuestoService } from './components/impuesto/ImpuestoService.service';
import { TipoImpuestoService } from './components/impuesto/TipoImpuestoService.service';
import { UnidadService } from './components/unidadmedida/UnidadService.service';
import { MarcaService } from './components/marca/MarcaService.service';
import { CatalogoClienteComponent } from './components/cliente/catalogo-cliente/catalogo-cliente.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { FilterClientePipe } from './components/cliente/catalogo-cliente/filter-cliente.pipe';
import { CatalogoImpuestoComponent } from './components/impuesto/catalogo-impuesto/catalogo-impuesto.component';
import { CatalogoCategoriaComponent } from './components/categoria/catalogo-categoria/catalogo-categoria.component';
import { CategoriaService } from './components/categoria/CategoriaService.service';
import { FilterCategoriaPipe } from './components/categoria/catalogo-categoria/filter-categoria.pipe';
import { AlmacenService } from './components/almacen/AlmacenService.service';
import { FilterAlmacenPipe } from './components/almacen/catalogo-almacen/filter-almacen.pipe';
import { CatalogoAlmacenComponent } from './components/almacen/catalogo-almacen/catalogo-almacen.component';
import { CrearAlmacenComponent } from './components/almacen/crear-almacen/crear-almacen.component';
import { CatalogoUsuarioComponent } from './components/configuracion/catalogo-usuario/catalogo-usuario.component';
import { FormaPagoService } from './components/formapago/FormaPagoService.service';
import { CatalogoFormapagoComponent } from './components/formapago/catalogo-formapago/catalogo-formapago.component';
import { CrearFormapagoComponent } from './components/formapago/crear-formapago/crear-formapago.component';
import { FilterFormapagoPipe } from './components/formapago/catalogo-formapago/filter-formapago.pipe';
import { MovimientosCajaService } from './components/movimientoscaja/MovimientosCajaService.service';
import { CatalogoMovimientoscajaComponent } from './components/movimientoscaja/catalogo-movimientoscaja/catalogo-movimientoscaja.component';
import { FacturaService } from './components/factura/FacturaService.service';
import { CatalogoFacturaComponent } from './components/factura/catalogo-factura/catalogo-factura.component';
import { ProveedorService } from './components/proveedor/ProveedorService.service';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { CatalogoProveedorComponent } from './components/proveedor/catalogo-proveedor/catalogo-proveedor.component';
import { FilterProveedorPipe } from './components/proveedor/catalogo-proveedor/filter-proveedor.pipe';
import { VendedorService } from './components/vendedor/VendedorService.service';
import { CatalogoVendedorComponent } from './components/vendedor/catalogo-vendedor/catalogo-vendedor.component';
import { CrearVendedorComponent } from './components/vendedor/crear-vendedor/crear-vendedor.component';
import { FilterVendedorPipe } from './components/vendedor/catalogo-vendedor/filter-vendedor.pipe';
import { CuentasxcobrarComponent } from './components/ventas/cuentasxcobrar/cuentasxcobrar.component';
import { CatalogoUnidadmedidaComponent } from './components/unidadmedida/catalogo-unidadmedida/catalogo-unidadmedida.component';

import { FilterUnidadmedidaPipe } from './components/unidadmedida/catalogo-unidadmedida/filter-unidadmedida.pipe';
import { CrearUnidadmedidaComponent } from './components/unidadmedida/crear-unidadmedida/crear-unidadmedida.component';
import { CatalogoTransaccionesComponent } from './components/transacciones/catalogo-transacciones/catalogo-transacciones.component';
import { TransaccionesService } from './components/transacciones/TransaccionesService.service';
import { FilterTransaccionesPipe } from './components/transacciones/catalogo-transacciones/filter-transacciones.pipe';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    AppComponent,
    CatalogoArticuloComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    RegistrarseComponent,
    MainComponent,
    FilterArticuloPipe,
    CrearArticuloComponent,
    CatalogoClienteComponent,
    CrearClienteComponent,
    FilterClientePipe,
    CatalogoImpuestoComponent,
    CrearImpuestoComponent,
    CatalogoCategoriaComponent,
    FilterCategoriaPipe,
    CatalogoAlmacenComponent,
    CrearAlmacenComponent,
    FilterAlmacenPipe,
    CatalogoUsuarioComponent,
    CatalogoFormapagoComponent,
    CrearFormapagoComponent,
    FilterFormapagoPipe,
    CatalogoMovimientoscajaComponent,
    CatalogoFacturaComponent,
    CrearProveedorComponent,
    CatalogoProveedorComponent,
    FilterProveedorPipe,
    CatalogoVendedorComponent,
    CrearVendedorComponent,
    FilterVendedorPipe,
    CuentasxcobrarComponent,
    CatalogoUnidadmedidaComponent,
    FilterUnidadmedidaPipe,
    CrearUnidadmedidaComponent,
    CatalogoTransaccionesComponent,
    FilterTransaccionesPipe
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
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    ArticuloService,
    AlmacenService,
    ClienteService,
    FamiliaService,
    GrupoArticuloService,
    ImpuestoService,
    TipoImpuestoService,
    MarcaService,
    UnidadService,
    CategoriaService,
    FormaPagoService,
    MovimientosCajaService,
    FacturaService,
    ProveedorService,
    VendedorService,
    TransaccionesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
