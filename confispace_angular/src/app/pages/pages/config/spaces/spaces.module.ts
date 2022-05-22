import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacesRoutingModule } from './spaces-routing.module';
import { SpacesComponent } from './spaces.component';
import { ConfigModule } from '../config.module';


@NgModule({
  declarations: [
    SpacesComponent
  ],
  imports: [
    CommonModule,
    SpacesRoutingModule,
    ConfigModule
    
  ]
})
export class SpacesModule { }
