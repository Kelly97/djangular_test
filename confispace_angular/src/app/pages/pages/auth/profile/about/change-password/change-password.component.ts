import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';

@Component({
  selector: 'vex-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

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

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

  save() {

  }

}
