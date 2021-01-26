
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoImpuestoComponent } from './components/impuesto/catalogo-impuesto/catalogo-impuesto.component';
import { CrearImpuestoComponent } from './components/impuesto/crear-impuesto/crear-impuesto.component';



import { CatalogoUsuarioComponent } from './components/configuracion/catalogo-usuario/catalogo-usuario.component';
import { CatalogoFormapagoComponent } from './components/formapago/catalogo-formapago/catalogo-formapago.component';
import { CatalogoMovimientoscajaComponent } from './components/movimientoscaja/catalogo-movimientoscaja/catalogo-movimientoscaja.component';
import { CatalogoProveedorComponent } from './components/proveedor/catalogo-proveedor/catalogo-proveedor.component';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { CatalogoUnidadmedidaComponent } from './components/unidadmedida/catalogo-unidadmedida/catalogo-unidadmedida.component';
import { CatalogoTransaccionesComponent } from './components/transacciones/catalogo-transacciones/catalogo-transacciones.component';
import { CrearFormapagoComponent } from './components/formapago/crear-formapago/crear-formapago.component';
import { MensajeEliminarComponent } from './components/mensajeria/mensaje-eliminar/mensaje-eliminar.component';
import { CatalogoTipoImpuestoComponentComponent } from './components/tipoimpuesto/catalogo-tipo-impuesto-component/catalogo-tipo-impuesto-component.component';
import { CrearTipoImpuestoComponentComponent } from './components/tipoimpuesto/crear-tipo-impuesto-component/crear-tipo-impuesto-component.component';
import { CatalogoMarcaComponent } from './components/marca/catalogo-marca/catalogo-marca.component';
import { CrearMarcaComponent } from './components/marca/crear-marca/crear-marca.component';
import { CatalogoDocumentosComprasComponent } from './components/compras/catalogo-documentos-compras/catalogo-documentos-compras.component';
import { DocumentosComprasComponent } from './components/compras/documentos-compras/documentos-compras.component';
import { CatalogoNumeraciondocumentoComponent } from './components/configuracion/catalogo-numeraciondocumento/catalogo-numeraciondocumento.component';
import { CrearNumeraciondocumentoComponent } from './components/configuracion/crear-numeraciondocumento/crear-numeraciondocumento.component';
import { CatalogoValorinventarioComponent } from './inventario/catalogo-valorinventario/catalogo-valorinventario.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'main/dashboard',
    loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)
  },

  { path: 'inventario/listarunidades', component: CatalogoUnidadmedidaComponent },
  { path: 'inventario/crearmarca', component: CrearMarcaComponent },
  { path: 'inventario/listarmarcas', component: CatalogoMarcaComponent },
  { path: 'inventario/listartransacciones', component: CatalogoTransaccionesComponent },
  { path: 'inventario/listarvalorinventario', component: CatalogoValorinventarioComponent },
  { path: 'ventas/movimientoscaja', component: CatalogoMovimientoscajaComponent },
  { path: 'configuracion/listarimpuestos', component: CatalogoImpuestoComponent },
  { path: 'configuracion/crearimpuestos', component: CrearImpuestoComponent },
  { path: 'configuracion/crearimpuestos/:id', component: CrearImpuestoComponent },
  { path: 'configuracion/usuario', component: CatalogoUsuarioComponent },
  { path: 'configuracion/listarformaspagos', component: CatalogoFormapagoComponent },
  { path: 'configuracion/crearformapagos', component: CrearFormapagoComponent },
  { path: 'configuracion/crearformapagos/:id', component: CrearFormapagoComponent },
  { path: 'configuracion/listartipoimpuesto', component: CatalogoTipoImpuestoComponentComponent },
  { path: 'configuracion/creartipoimpuesto', component: CrearTipoImpuestoComponentComponent },
  { path: 'configuracion/creartipoimpuesto/:id', component: CrearTipoImpuestoComponentComponent },
  { path: 'compras/listarproveedores', component: CatalogoProveedorComponent },
  { path: 'compras/crearproveedor', component: CrearProveedorComponent },
  { path: 'compras/catalogodocumentodecompra-factura/:tipodocumento', component: CatalogoDocumentosComprasComponent },
  { path: 'compras/documentodecompra-factura/:tipodocumento', component: DocumentosComprasComponent },
  { path: 'configuracion/crearnumeraciondocumento', component: CrearNumeraciondocumentoComponent },
  { path: 'configuracion/crearnumeraciondocumento/:id', component: CrearNumeraciondocumentoComponent },
  { path: 'configuracion/listarnumeraciondocumentos', component: CatalogoNumeraciondocumentoComponent },
  { path: 'inventarios', loadChildren: () => import('./components/inventarios/inventarios.module').then(m => m.InventariosModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
