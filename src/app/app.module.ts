import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { CatalogoClienteComponent } from './components/cliente/catalogo-cliente/catalogo-cliente.component';
import { CatalogoVendedorComponent } from './components/vendedor/catalogo-vendedor/catalogo-vendedor.component';
import { ClienteService } from './components/cliente/ClienteService.service';
import { HttpClientModule } from '@angular/common/http';
import { VendedorService } from './components/vendedor/VendedorService.service';
import { CatalogoFormapagoComponent } from './components/formapago/catalogo-formapago/catalogo-formapago.component';
import { FormaPagoService } from './components/formapago/FormaPagoService.service';
import { MainComponent } from './components/main/main.component';
import { CatalogoMovimientoscajaComponent } from './components/movimientoscaja/catalogo-movimientoscaja/catalogo-movimientoscaja.component';
import { CuentasxcobrarComponent } from './components/ventas/cuentasxcobrar/cuentasxcobrar.component';
import { CatalogoProveedorComponent } from './components/proveedor/catalogo-proveedor/catalogo-proveedor.component';
import { ProveedorService } from './components/proveedor/ProveedorService.service';
import { CatalogoFacturaComponent } from './components/factura/catalogo-factura/catalogo-factura.component';
import { FacturaService } from './components/factura/FacturaService.service';
import { MovimientosCajaService } from './components/movimientoscaja/MovimientosCajaService.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CatalogoArticuloComponent } from './components/articulo/catalogo-articulo/catalogo-articulo.component';
import { ArticuloService } from './components/articulo/ArticuloService.service';
import { CatalogoUsuarioComponent } from './components/configuracion/catalogo-usuario/catalogo-usuario.component';
import { CrearArticuloComponent } from './components/articulo/crear-articulo/crear-articulo.component';
import { FamiliaService } from './components/familia/FamiliaService.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnidadService } from './components/unidadmedida/UnidadService.service';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { ImpuestoService } from './components/impuesto/ImpuestoService.service';
import { Marca } from './components/model/Marca.model';
import { MarcaService } from './components/marca/MarcaService.service';
import { GrupoArticuloService } from './components/grupoarticulo/GrupoArticuloService.service';
import { CatalogoImpuestoComponent } from './components/impuesto/catalogo-impuesto/catalogo-impuesto.component';
import { CrearImpuestoComponent } from './components/impuesto/crear-impuesto/crear-impuesto.component';
import { TipoImpuestoService } from './components/impuesto/TipoImpuestoService.service';
import { FilterClientePipe } from './components/cliente/catalogo-cliente/filter-cliente.pipe';
import { FilterVendedorPipe } from './components/vendedor/catalogo-vendedor/filter-vendedor.pipe';
import { FilterArticuloPipe } from './components/articulo/catalogo-articulo/filter-articulo.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    CatalogoClienteComponent,
    CatalogoVendedorComponent,
    CatalogoFormapagoComponent,
    MainComponent,
    CatalogoMovimientoscajaComponent,
    CuentasxcobrarComponent,
    CatalogoProveedorComponent,
    CatalogoFacturaComponent,
    CatalogoArticuloComponent,
    CatalogoUsuarioComponent,
    CrearArticuloComponent,
    CrearClienteComponent,
    CatalogoImpuestoComponent,
    CrearImpuestoComponent,
    FilterClientePipe,
    FilterVendedorPipe,
    FilterArticuloPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ClienteService,
              VendedorService,
              FormaPagoService,
              ProveedorService,
              FacturaService,
              MovimientosCajaService,
              ArticuloService,
              FamiliaService,
              UnidadService,
              ImpuestoService,
              MarcaService,
              TipoImpuestoService,
              GrupoArticuloService],

  bootstrap: [AppComponent]
})
export class AppModule { }
