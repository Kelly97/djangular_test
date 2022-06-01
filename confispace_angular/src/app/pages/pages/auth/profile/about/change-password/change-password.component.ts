import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from 'src/app/utilities/validators';

@Component({
  selector: 'vex-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  inputType = "password";
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  icClose = icClose;

  form = new FormGroup({
    old_password: new FormControl("", Validators.required),
    new_password: new FormControl("", [
      Validators.required,
      Validators.pattern(CustomValidators.passwordRegex),
      Validators.minLength(8)]),
    new_password_confirm: new FormControl("", Validators.required),
  }, CustomValidators.mustMatch("new_password", "new_password_confirm"));

  client_validation_messages = {
    old_password: [
      { type: "required", message: "El campo es requerido." },
    ],
    new_password: [
      { type: "required", message: "El campo es requerido." },
      {
        type: "minlength",
        message: "Se deben ingresar al menos 8 caracteres.",
      },
      {
        type: "pattern",
        message:
          "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial !@#$%^&*",
      },
    ],
    new_password_confirm: [
      { type: "required", message: "El campo es requerido." },
      { type: "mustMatch", message: "Las contraseñas no coinciden." },
    ],
  }
  server_validation_messages = {};

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authService.changePassword(this.form.value).subscribe(
        (res) => { this.dialogRef.close() },
        (error) => {
          this.server_validation_messages = error;
          this.form.markAllAsTouched();
        });
    }
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }

}
