import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Holiday } from '../../interfaces/holiday';
import icClose from '@iconify/icons-ic/twotone-close';
import { HolidaysService } from '../../services/holidays.service';
import moment from 'moment';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'vex-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss'],
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
      const data = { ...this.form.value, date: moment(this.form.value.date).format(environment.standardDate) }
      console.log(data)
      this.holidaysService.createHoliday(data).subscribe((result: any) => {
        if (result != null) {
          this.dialogRef.close(result);
          console.log(result)
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
    if (this.form.valid) { }

    const customer = this.form.value;
    customer.id = this.defaults.id;

    //this.dialogRef.close(customer);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
