import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprasComponent } from './compras.component';

const routes: Routes = [{ path: '', component: ComprasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
