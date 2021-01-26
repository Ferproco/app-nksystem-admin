import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventariosComponent } from './inventarios.component';

const routes: Routes = [{ path: '', component: InventariosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
