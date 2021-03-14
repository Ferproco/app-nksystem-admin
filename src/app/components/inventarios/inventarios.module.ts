import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventariosRoutingModule } from './inventarios-routing.module';
import { InventariosComponent } from './inventarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CatalogoValorinventarioComponent } from './catalogo-valorinventario/catalogo-valorinventario.component';
import { KardexService } from './KardexService.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CatalogoValorkardexComponent } from './catalogo-valorkardex/catalogo-valorkardex.component';
import { ArticuloService } from '../portafolio/articulo/ArticuloService.service';
import { TableTransaccionInventariosComponent } from './table-transaccion-inventarios/table-transaccion-inventarios.component';


@NgModule({
  declarations:
    [
      InventariosComponent,
      CatalogoValorinventarioComponent,
      CatalogoValorkardexComponent,
      TableTransaccionInventariosComponent,
    ],
  imports: [
    CommonModule,
    InventariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  providers: [
    KardexService,
    ArticuloService,
  ]
})
export class InventariosModule { }
