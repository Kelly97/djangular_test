import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidaysRoutingModule } from './holidays-routing.module';
import { HolidaysComponent } from './holidays.component';


@NgModule({
  declarations: [
    HolidaysComponent
  ],
  imports: [
    CommonModule,
    HolidaysRoutingModule
  ]
})
export class HolidaysModule { }
