import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoArticuloComponent } from './components/articulo/catalogo-articulo/catalogo-articulo.component';
import { CrearArticuloComponent } from './components/articulo/crear-articulo/crear-articulo.component';
import { CatalogoClienteComponent } from './components/cliente/catalogo-cliente/catalogo-cliente.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { CatalogoImpuestoComponent } from './components/impuesto/catalogo-impuesto/catalogo-impuesto.component';
import { CrearImpuestoComponent } from './components/impuesto/crear-impuesto/crear-impuesto.component';
import { CatalogoCategoriaComponent } from './components/categoria/catalogo-categoria/catalogo-categoria.component';
import { CatalogoAlmacenComponent } from './components/almacen/catalogo-almacen/catalogo-almacen.component';
import { CrearAlmacenComponent } from './components/almacen/crear-almacen/crear-almacen.component';
import { CatalogoUsuarioComponent } from './components/configuracion/catalogo-usuario/catalogo-usuario.component';
import { CatalogoFormapagoComponent } from './components/formapago/catalogo-formapago/catalogo-formapago.component';
import { CatalogoMovimientoscajaComponent } from './components/movimientoscaja/catalogo-movimientoscaja/catalogo-movimientoscaja.component';
import { CatalogoFacturaComponent } from './components/factura/catalogo-factura/catalogo-factura.component';
import { CatalogoProveedorComponent } from './components/proveedor/catalogo-proveedor/catalogo-proveedor.component';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { CatalogoVendedorComponent } from './components/vendedor/catalogo-vendedor/catalogo-vendedor.component';
import { CrearVendedorComponent } from './components/vendedor/crear-vendedor/crear-vendedor.component';
import { CatalogoUnidadmedidaComponent } from './components/unidadmedida/catalogo-unidadmedida/catalogo-unidadmedida.component';

import { CatalogoTransaccionesComponent } from './components/transacciones/catalogo-transacciones/catalogo-transacciones.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'main/dashboard', component: MainComponent},
  { path: 'inventario/listararticulos', component: CatalogoArticuloComponent},
  { path: 'inventario/creararticulo', component: CrearArticuloComponent},
  { path: 'inventario/listaralmacenes', component: CatalogoAlmacenComponent},
  { path: 'inventario/crearalmacen', component: CrearAlmacenComponent},
  { path: 'inventario/listarunidades', component: CatalogoUnidadmedidaComponent},
  { path: 'inventario/listarcategorias', component: CatalogoCategoriaComponent},
  { path: 'inventario/listartransacciones', component: CatalogoTransaccionesComponent},
  { path: 'ventas/clientes', component: CatalogoClienteComponent},
  { path: 'ventas/crearcliente', component: CrearClienteComponent},
  { path: 'ventas/facturas', component: CatalogoFacturaComponent},
  { path: 'ventas/movimientoscaja', component: CatalogoMovimientoscajaComponent},
  { path: 'ventas/listarvendedores', component: CatalogoVendedorComponent},
  { path: 'ventas/crearvendedores', component: CrearVendedorComponent},
  { path: 'configuracion/listarimpuestos', component: CatalogoImpuestoComponent},
  { path: 'configuracion/crearimpuestos', component: CrearImpuestoComponent},
  { path: 'configuracion/usuario', component: CatalogoUsuarioComponent},
  { path: 'configuracion/listarformapagos', component: CatalogoFormapagoComponent},
  { path: 'configuracion/crearformapagos', component: CatalogoFormapagoComponent},
  { path: 'compras/listarproveedores', component: CatalogoProveedorComponent},
  { path: 'compras/crearproveedor', component: CrearProveedorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
