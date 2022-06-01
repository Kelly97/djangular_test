import { Component, OnInit } from '@angular/core';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import icMail from '@iconify/icons-ic/mail-outline';
import icPerson from '@iconify/icons-ic/outline-insert-emoticon';
import icClock from '@iconify/icons-ic/outline-query-builder';
import icCalendar from '@iconify/icons-ic/event';
import icEdit from '@iconify/icons-ic/outline-edit';
import icPassword from '@iconify/icons-ic/outline-password';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'vex-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class AboutComponent implements OnInit {

  icMail = icMail;
  icPerson = icPerson;
  icClock = icClock;
  icCalendar = icCalendar;
  icEdit = icEdit;
  icPassword = icPassword;

  profile;

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.authService.profile().subscribe(resp => this.profile = resp);
  }

  changePassword(): void {
    this.dialog.open(ChangePasswordComponent, {
      minWidth: 340
    });
  }

  updateUser(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      minWidth: 340,
      data: this.profile
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.profile = { ...this.profile, ...result };
    });
  }

}
