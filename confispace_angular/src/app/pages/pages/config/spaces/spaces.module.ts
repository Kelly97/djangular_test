import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacesRoutingModule } from './spaces-routing.module';
import { SpacesComponent } from './spaces.component';
import { ConfigModule } from '../config.module';
import { SpaceFormComponent } from './space-form/space-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { TruncateModule } from 'src/app/pipes/truncate/truncate.module';
import { SpaceDetailsComponent } from './space-details/space-details.component';
import { SpaceSchedulesComponent } from './space-schedules/space-schedules.component';
import { DaySchedulesModule } from 'src/app/components/day-schedules/day-schedules.module';
import { HelpButtonModule } from 'src/app/components/help-button/help-button.module';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SpacesComponent,
    SpaceFormComponent,
    SpaceDetailsComponent,
    SpaceSchedulesComponent
  ],
  imports: [
    CommonModule,
    SpacesRoutingModule,
    ConfigModule,
    MatMenuModule,
    TruncateModule,
    DaySchedulesModule,
    HelpButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SpacesModule { }
