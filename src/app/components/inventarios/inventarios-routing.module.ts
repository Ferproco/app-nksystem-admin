import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoValorinventarioComponent } from './catalogo-valorinventario/catalogo-valorinventario.component';
import { CatalogoValorkardexComponent } from './catalogo-valorkardex/catalogo-valorkardex.component';

import { InventariosComponent } from './inventarios.component';

const routes: Routes =
  [
    {
      path: '', component: InventariosComponent,

      children: [
        {
          path: 'listarkardex',
          component: CatalogoValorinventarioComponent
        },
        {
          path: 'listarkardexproductos',
          component: CatalogoValorkardexComponent
        },
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
