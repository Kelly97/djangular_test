import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import moment from 'moment';
import { commonFunctions } from 'src/app/utilities/common-functions';

@Directive({
  selector: '[TimeRangeValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TimeRangeValidatorDirective, multi: true }]
})
export class TimeRangeValidatorDirective implements Validator, OnChanges {

  @Input() TimeRangeValidator: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!commonFunctions.validTimeRange(this.TimeRangeValidator, control.value)) {
      return { invalidRange: true };
    }
    return null;
  }

  onChange: () => void;

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('TimeRangeValidator' in changes && this.onChange) {
      this.onChange();
    }
  }

}
