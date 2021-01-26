import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionesRoutingModule } from './configuraciones-routing.module';
import { ConfiguracionesComponent } from './configuraciones.component';


@NgModule({
  declarations: [ConfiguracionesComponent],
  imports: [
    CommonModule,
    ConfiguracionesRoutingModule
  ]
})
export class ConfiguracionesModule { }
