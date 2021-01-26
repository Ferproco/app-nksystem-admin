import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoValorinventarioComponent } from './catalogo-valorinventario/catalogo-valorinventario.component';

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
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
