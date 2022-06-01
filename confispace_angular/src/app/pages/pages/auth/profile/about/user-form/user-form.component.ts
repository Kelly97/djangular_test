import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/utilities/validators';
import icClose from '@iconify/icons-ic/twotone-close';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'vex-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  icClose = icClose;

  form = new FormGroup({
    first_name: new FormControl("", [
      Validators.required,
      CustomValidators.onlyChar(),
    ]),
    last_name: new FormControl("", [
      Validators.required,
      CustomValidators.onlyChar(),
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(CustomValidators.mailRegex),
    ]),
  });

  client_validation_messages = {
    first_name: [
      { type: "required", message: "El campo es requerido." },
      { type: "onlyChar", message: "Solo se admiten letras y espacios." },
    ],
    last_name: [
      { type: "required", message: "El campo es requerido." },
      { type: "onlyChar", message: "Solo se admiten letras y espacios." },
    ],
    email: [
      { type: "required", message: "El campo es requerido." },
      { type: "pattern", message: "Debe ingresar un correo válido." },
    ],
  }
  server_validation_messages = {};

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    if (this.data) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].setValue(this.data[key]);
      });
    }
  }

  save() {
    if (this.form.valid) {
      this.authService.updateProfile(this.form.value).subscribe((result: any) => {
        if (result != null) {
          const profile = { ...this.form.value, ...result };
          this.storage.updateUser(profile);
          this.dialogRef.close(profile);
        }
      },
        (error) => {
          this.server_validation_messages = error;
          this.form.markAllAsTouched();
        });
    }
  }

}
