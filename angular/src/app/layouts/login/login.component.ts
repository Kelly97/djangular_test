import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from './../../services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private storageService: LocalstorageService
  ) {}

  hidePass = true;

  LoginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  login() {
    console.log(this.LoginForm.valid)
    if (this.LoginForm.valid) {
      this.authService
        .loginService(this.LoginForm.value)
        .subscribe((result: any) => {
          console.log(result);
          if (result != null) {
            this.storageService.setToken(result.token);
            //this.route.navigate([''])
          }
        });
    }
  }
}
