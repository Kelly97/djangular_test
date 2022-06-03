import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaySchedulesComponent } from './day-schedules.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    DaySchedulesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DaySchedulesComponent,
    MatMenuModule,
    MatTooltipModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    IconModule,
    FlexLayoutModule,
    
  ],
})
export class DaySchedulesModule { }
