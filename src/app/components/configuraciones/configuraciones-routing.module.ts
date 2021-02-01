import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';





import { ConfiguracionesComponent } from './configuraciones.component';
import { CatalogoImpuestoComponent } from './impuesto/catalogo-impuesto/catalogo-impuesto.component';
import { CrearImpuestoComponent } from './impuesto/crear-impuesto/crear-impuesto.component';
import { CatalogoNumeraciondocumentoComponent } from './numeraciondocumento/catalogo-numeraciondocumento/catalogo-numeraciondocumento.component';
import { CrearNumeraciondocumentoComponent } from './numeraciondocumento/crear-numeraciondocumento/crear-numeraciondocumento.component';
import { CatalogoTipoImpuestoComponentComponent } from './tipoimpuesto/catalogo-tipo-impuesto-component/catalogo-tipo-impuesto-component.component';
import { CrearTipoImpuestoComponentComponent } from './tipoimpuesto/crear-tipo-impuesto-component/crear-tipo-impuesto-component.component';


const routes: Routes =
  [
    {
      path: '', component: ConfiguracionesComponent,
      children: [
        {
          path: 'listarimpuestos',
          component: CatalogoImpuestoComponent
        },
        {
          path: 'crearimpuestos',
          component: CrearImpuestoComponent
        },
        {
          path: 'crearimpuestos/:id',
          component: CrearImpuestoComponent
        },
       
        {
          path: 'listartipoimpuestos',
          component: CatalogoTipoImpuestoComponentComponent
        },
        {
          path: 'creartipoimpuesto',
          component: CrearTipoImpuestoComponentComponent
        },
        {
          path: 'creartipoimpuesto/:id',
          component: CrearTipoImpuestoComponentComponent
        },
        {
          path: 'listarnumeraciondocumentos',
          component: CatalogoNumeraciondocumentoComponent
        },
        {
          path: 'crearnumeraciondocumento',
          component: CrearNumeraciondocumentoComponent
        },
        {
          path: 'crearnumeraciondocumento/:id',
          component: CrearNumeraciondocumentoComponent
        },
       /* {
          path: 'crear-numeraciondocumento-modal',
          component: CrearNumeraciondocumentoModalComponent
        },*/
        
      ]
    }
    
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionesRoutingModule { }
