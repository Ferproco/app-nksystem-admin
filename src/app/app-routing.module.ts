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
import { CrearCategoriaComponent } from './components/categoria/crear-categoria/crear-categoria.component';
import { CatalogoContactosComponent } from './components/contacto/catalogo-contactos/catalogo-contactos.component';
import { CrearContactoComponent } from './components/contacto/crear-contacto/crear-contacto.component';
import { CrearFormapagoComponent } from './components/formapago/crear-formapago/crear-formapago.component';
import { MensajeEliminarComponent } from './components/mensajeria/mensaje-eliminar/mensaje-eliminar.component';
import { CatalogoTipoImpuestoComponentComponent } from './components/tipoimpuesto/catalogo-tipo-impuesto-component/catalogo-tipo-impuesto-component.component';
import { CrearTipoImpuestoComponentComponent } from './components/tipoimpuesto/crear-tipo-impuesto-component/crear-tipo-impuesto-component.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  /*{ path: '', component: LoginComponent},*/
  { path: 'main/dashboard', component: MainComponent},
  { path: 'inventario/listararticulos', component: CatalogoArticuloComponent},
  { path: 'inventario/creararticulo', component: CrearArticuloComponent},
  { path: 'inventario/creararticulo/:id', component: CrearArticuloComponent},
  { path: 'inventario/listaralmacenes', component: CatalogoAlmacenComponent},
  { path: 'inventario/crearalmacen', component: CrearAlmacenComponent},
  { path: 'inventario/listarunidades', component: CatalogoUnidadmedidaComponent},
  { path: 'inventario/listarcategorias', component: CatalogoCategoriaComponent},
  { path: 'inventario/crearcategoria', component: CrearCategoriaComponent},
  { path: 'inventario/listartransacciones', component: CatalogoTransaccionesComponent},
  { path: 'ventas/clientes', component: CatalogoClienteComponent},
  { path: 'ventas/crearcliente', component: CrearClienteComponent},
  { path: 'ventas/facturas', component: CatalogoFacturaComponent},
  { path: 'ventas/movimientoscaja', component: CatalogoMovimientoscajaComponent},
  { path: 'ventas/listarvendedores', component: CatalogoVendedorComponent},
  { path: 'ventas/crearvendedores', component: CrearVendedorComponent},
  { path: 'configuracion/listarimpuestos', component: CatalogoImpuestoComponent},
  { path: 'configuracion/crearimpuestos', component: CrearImpuestoComponent},
  { path: 'configuracion/crearimpuestos/:id', component: CrearImpuestoComponent},
  { path: 'configuracion/usuario', component: CatalogoUsuarioComponent},
  { path: 'configuracion/listarformaspagos', component: CatalogoFormapagoComponent},
  { path: 'configuracion/crearformapagos', component: CrearFormapagoComponent},
  { path: 'configuracion/crearformapagos/:id', component: CrearFormapagoComponent},
  { path: 'configuracion/listartipoimpuesto', component: CatalogoTipoImpuestoComponentComponent},
  { path: 'configuracion/creartipoimpuesto', component: CrearTipoImpuestoComponentComponent},
  { path: 'configuracion/creartipoimpuesto/:id', component: CrearTipoImpuestoComponentComponent},
  { path: 'compras/listarproveedores', component: CatalogoProveedorComponent},
  { path: 'compras/crearproveedor', component: CrearProveedorComponent},
  { path: 'contactos/listarcontactos', component: CatalogoContactosComponent},
  { path: 'contactos/crearcontacto', component: CrearContactoComponent},
  { path: 'contactos/crearcontacto/:id', component: CrearContactoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
