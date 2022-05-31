import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Holiday } from '../../interfaces/holiday';
import icClose from '@iconify/icons-ic/twotone-close';
import { HolidaysService } from '../../services/holidays.service';
import { commonFunctions } from "src/app/utilities/common-functions";

import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'vex-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class HolidayFormComponent implements OnInit {

  mode: 'create' | 'update' = 'create';

  icClose = icClose;

  form = new FormGroup({
    date: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    is_active: new FormControl(true, Validators.required),
  });

  client_validation_messages = {
    date: [
      { type: "required", message: "Seleccione una fecha válida." },
    ],
    description: [
      { type: "required", message: "El campo es requerido." },
    ],
  }
  server_validation_messages = {};

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<HolidayFormComponent>, public holidaysService: HolidaysService) { }

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].setValue(this.defaults[key]);
      });
    } else {
      this.defaults = {} as Holiday;
    }
  }

  save() {
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }

  createCustomer() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const data = { ...this.form.value, date: commonFunctions.getStandardDate(this.form.value.date) }
      this.holidaysService.createHoliday(data).subscribe((result: any) => {
        if (result != null) {
          this.dialogRef.close(result);
        }
      },
        (error) => {
          this.server_validation_messages = error;
          this.form.markAllAsTouched();
        });
    }
  }

  updateCustomer() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const item = { ...this.form.value, date: commonFunctions.getStandardDate(this.form.value.date) }
      item.id = this.defaults.id;
      this.holidaysService.updateHoliday(item.id, item).subscribe((result: any) => {
        if (result != null) {
          this.dialogRef.close({ ...item, ...result });
        }
      },
        (error) => {
          this.server_validation_messages = error;
          this.form.markAllAsTouched();
        });
    }
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
