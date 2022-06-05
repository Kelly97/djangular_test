import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaySchedulesComponent } from './day-schedules.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';



@NgModule({
  declarations: [
    DaySchedulesComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatTooltipModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    IconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatBadgeModule,
    FormsModule
  ],
  exports: [
    DaySchedulesComponent,
  ],
})
export class DaySchedulesModule { }
