
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoMovimientoscajaComponent } from './components/movimientoscaja/catalogo-movimientoscaja/catalogo-movimientoscaja.component';
import { CatalogoProveedorComponent } from './components/proveedor/catalogo-proveedor/catalogo-proveedor.component';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { CatalogoTransaccionesComponent } from './components/transacciones/catalogo-transacciones/catalogo-transacciones.component';
import { MensajeEliminarComponent } from './components/mensajeria/mensaje-eliminar/mensaje-eliminar.component';
import { CatalogoDocumentosComprasComponent } from './components/compras/catalogo-documentos-compras/catalogo-documentos-compras.component';
import { DocumentosComprasComponent } from './components/compras/documentos-compras/documentos-compras.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'main/dashboard',
    loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)
  },

  { path: 'inventario/listartransacciones', component: CatalogoTransaccionesComponent },
  { path: 'ventas/movimientoscaja', component: CatalogoMovimientoscajaComponent },
  { path: 'compras/listarproveedores', component: CatalogoProveedorComponent },
  { path: 'compras/crearproveedor', component: CrearProveedorComponent },
  { path: 'compras/catalogodocumentodecompra-factura/:tipodocumento', component: CatalogoDocumentosComprasComponent },
  { path: 'compras/documentodecompra-factura/:tipodocumento', component: DocumentosComprasComponent },
  { path: 'inventarios', loadChildren: () => import('./components/inventarios/inventarios.module').then(m => m.InventariosModule) },
  { path: 'configuraciones', loadChildren: () => import('./components/configuraciones/configuraciones.module').then(m => m.ConfiguracionesModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
