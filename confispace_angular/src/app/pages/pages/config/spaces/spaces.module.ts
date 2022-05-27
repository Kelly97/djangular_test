import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacesRoutingModule } from './spaces-routing.module';
import { SpacesComponent } from './spaces.component';
import { ConfigModule } from '../config.module';
import { SpaceFormComponent } from './space-form/space-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { TruncateModule } from 'src/app/pipes/truncate/truncate.module';


@NgModule({
  declarations: [
    SpacesComponent,
    SpaceFormComponent
  ],
  imports: [
    CommonModule,
    SpacesRoutingModule,
    ConfigModule,
    MatMenuModule,
    TruncateModule
  ]
})
export class SpacesModule { }
