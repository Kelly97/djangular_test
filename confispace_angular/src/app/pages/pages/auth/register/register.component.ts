import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from 'src/app/utilities/validators';

@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class RegisterComponent implements OnInit {

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  form = new FormGroup({
    first_name: new FormControl("", [Validators.required, CustomValidators.onlyChar()]),
    last_name: new FormControl("", [Validators.required, CustomValidators.onlyChar()]),
    username: new FormControl("", [Validators.required, Validators.minLength(4)]),
    email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl("", Validators.required)
  },
    CustomValidators.mustMatch('password', 'passwordConfirm'));

  client_validation_messages = {
    'first_name': [
      { type: 'required', message: 'El campo es requerido.' },
      { type: 'onlyChar', message: 'Solo se admiten letras y espacios.' }
    ],
    'last_name': [
      { type: 'required', message: 'El campo es requerido.' },
      { type: 'onlyChar', message: 'Solo se admiten letras y espacios.' }
    ],
    'username': [
      { type: 'required', message: 'El campo es requerido.' },
      { type: 'minlength', message: 'El nombre de usuario debe contener al menos 4 caracteres.' },
      { type: 'pattern', message: 'Solo se admiten letras, número y los caracteres @.+-_' },
    ],
    'email': [
      { type: 'required', message: 'El campo es requerido.' },
      { type: 'pattern', message: 'Debe ingresar un correo válido.' }
    ],
    'password': [
      { type: 'required', message: 'El campo es requerido.' },
      { type: 'minlength', message: 'Se deben ingresar al menos 6 caracteres.' },
      { type: 'pattern', message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número.' }
    ],
    'passwordConfirm': [
      { type: 'required', message: 'El campo es requerido.' },
      { type: 'mustMatch', message: 'Las contraseñas no coinciden.' }
    ],
  }

  server_validation_messages = {};

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  ngOnInit() { }

  send() {
    this.router.navigate(['/']);
  }

  register() {
    if (this.form.valid) {
      this.authService
        .regiterService(this.form.value)
        .subscribe((result: any) => {
          if (result != null) {
            this.storageService.setToken(result.token);
            this.storageService.setUser(result.user);
            this.router.navigate(['/'])
          }
        }, (error) => {
          this.server_validation_messages = error;
          this.form.markAllAsTouched();
          console.log(error.status)
        });
    }
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
