import { Component, EventEmitter, Input, Output } from '@angular/core';
import icAdd from '@iconify/icons-ic/add'
import icCopy from '@iconify/icons-ic/content-copy'
import icHypen from '@iconify/icons-ic/sharp-minus'
import icDelete from '@iconify/icons-ic/sharp-delete-outline'
import icPeople from '@iconify/icons-ic/round-group'
import icClock from '@iconify/icons-ic/outline-schedule'
import { commonFunctions } from 'src/app/utilities/common-functions';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import moment from 'moment';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { scaleInOutAnimation } from 'src/@vex/animations/scale-in-out.animation';
import { group } from '@angular/animations';

@Component({
  selector: 'day-schedules',
  templateUrl: './day-schedules.component.html',
  styleUrls: ['./day-schedules.component.scss'],
  animations: [stagger40ms, scaleInOutAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DaySchedulesComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DaySchedulesComponent
    }
  ]
})
export class DaySchedulesComponent implements ControlValueAccessor, Validator {

  icAdd = icAdd;
  icCopy = icCopy;
  icHypen = icHypen;
  icDelete = icDelete;
  icPeople = icPeople;
  icClock = icClock;

  commonFunctions = commonFunctions;
  moment = moment;
  weekDays = JSON.parse(JSON.stringify(commonFunctions.weekDays));

  schedule: schedule = { day: null, label: null, ranges: [] };
  rangesCopy: timeRange[] = [];

  @Input() groups: group[] = []
  @Output() onCopied = new EventEmitter();

  touched = false;
  disabled = false;

  groupsCount(range): number {
    return range.groups.filter(group => group.checked).length;
  }

  constructor() { }

  onChange = (schedule) => { };

  onTouched = () => { };

  onValidationChange: any = () => { };

  checkCurrentDay() {
    const day: any = this.weekDays.find(day => day.day === this.schedule?.day);
    day && (day.checked = true);
  }

  updateBadge(index: number) {
    this.schedule.ranges[index].groupsCount = this.schedule.ranges[index].groups.filter(group => group.checked === true)?.length;
  }

  toogleCheckDay(event) {
    if (event.checked === true) {
      if (this.rangesCopy.length > 0) {
        this.schedule.ranges = Object.assign([], this.rangesCopy)
      } else {
        this.onAdd();
      }
    } else if (event.checked === false) {
      this.rangesCopy = Object.assign([], this.schedule?.ranges);
      this.schedule.ranges = []
    }
    this.onChange(this.schedule);
  }

  onAdd() {
    this.markAsTouched();
    if (!this.disabled) {
      !this.schedule.ranges && (this.schedule.ranges = []);
      this.schedule.ranges.push({
        id: null,
        start_time: "",
        end_time: "",
        groups: Object.assign([], this.groups),
        day: this.schedule.day
      })
      this.onChange(this.schedule);
    }
  }

  onRemove(index) {
    this.markAsTouched();
    if (!this.disabled) {
      this.schedule.ranges.splice(index, 1);
      this.onChange(this.schedule);
    }
  }

  handleChange() {
    this.onTouched();
    this.onChange(this.schedule);
  }

  onCopy() {
    const days = this.weekDays.filter((day: any) => day.day != this.schedule.day && day.checked)
    const data = {
      days: days.map(day => day.day),
      ranges: this.schedule.ranges
    }
    this.onCopied.emit(data);
    this.weekDays.map((day: any) => day.checked = false);
  }

  writeValue(schedule: schedule) {
    this.schedule = schedule;
    this.schedule.ranges?.forEach(element => {
      element.end_time = commonFunctions.getTime(element.end_time, "HH:mm")
      element.start_time = commonFunctions.getTime(element.start_time, "HH:mm")
      const groupsChecked = JSON.parse(JSON.stringify(element.groups))
      element.groups = JSON.parse(JSON.stringify(this.groups))
      groupsChecked.forEach(group => {
        element.groups.find(el => el.id === group.id).checked = true;
      })
      element.groupsCount = element.groups.filter(group => group.checked === true)?.length;
    });
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
    this.onValidationChange();
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }


  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value.ranges?.some(el => !commonFunctions.validTimeRange(el.start_time, el.end_time)))
      return { rangeInvalid: true }
    else if (commonFunctions.overlapTimeRanges(control.value?.ranges))
      return { rangeOverlap: true }
    else
      return null
  }

}

export interface schedule {
  day: number;
  label: string;
  ranges?: timeRange[];
}

export interface timeRange {
  id: number;
  start_time: string;
  end_time: string;
  groups: group[];
  groupsCount?: number;
  day?: number;
}

export interface group {
  id: number;
  name: string;
  checked?: boolean;
}