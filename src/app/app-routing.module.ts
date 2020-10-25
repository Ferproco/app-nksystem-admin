import { CatalogoVendedorComponent } from './components/vendedor/catalogo-vendedor/catalogo-vendedor.component';
import { CatalogoClienteComponent } from './components/cliente/catalogo-cliente/catalogo-cliente.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoFormapagoComponent } from './components/formapago/catalogo-formapago/catalogo-formapago.component';
import { MainComponent } from './components/main/main.component';
import { CatalogoProveedorComponent } from './components/proveedor/catalogo-proveedor/catalogo-proveedor.component';
import { CatalogoFacturaComponent } from './components/factura/catalogo-factura/catalogo-factura.component';
import { CatalogoMovimientoscajaComponent } from './components/movimientoscaja/catalogo-movimientoscaja/catalogo-movimientoscaja.component';
import { CatalogoArticuloComponent } from './components/articulo/catalogo-articulo/catalogo-articulo.component';
import { CatalogoUsuarioComponent } from './components/configuracion/catalogo-usuario/catalogo-usuario.component';
import { CrearArticuloComponent } from './components/articulo/crear-articulo/crear-articulo.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { CatalogoImpuestoComponent } from './components/impuesto/catalogo-impuesto/catalogo-impuesto.component';
import { CrearImpuestoComponent } from './components/impuesto/crear-impuesto/crear-impuesto.component';


const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'ventas/clientes', component: CatalogoClienteComponent},
  { path: 'ventas/vendedores', component: CatalogoVendedorComponent},
  { path: 'ventas/formapagos', component: CatalogoFormapagoComponent},
  { path: 'ventas/proveedores', component: CatalogoProveedorComponent},
  { path: 'ventas/facturas', component: CatalogoFacturaComponent},
  { path: 'ventas/movimientoscaja', component: CatalogoMovimientoscajaComponent},
  { path: 'inventario/listararticulos', component: CatalogoArticuloComponent},
  { path: 'inventario/creararticulo', component: CrearArticuloComponent},
  { path: 'ventas/crearcliente', component: CrearClienteComponent},
  { path: 'ventas/listarimpuestos', component: CatalogoImpuestoComponent},
  { path: 'ventas/crearimpuestos', component: CrearImpuestoComponent},
  { path: 'configuracion/usuario', component: CatalogoUsuarioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
