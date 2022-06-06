import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeRangeValidatorDirective } from './time-range-validator.directive';



@NgModule({
  declarations: [TimeRangeValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [TimeRangeValidatorDirective]
})
export class TimeRangeValidatorModule { }
