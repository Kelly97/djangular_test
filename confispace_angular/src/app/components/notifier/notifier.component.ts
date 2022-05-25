import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import icClose from '@iconify/icons-ic/twotone-close';
import icInfo from '@iconify/icons-ic/info-outline';
import icSuccess from '@iconify/icons-ic/check-circle';
import icError from '@iconify/icons-ic/round-error-outline';
import icWarn from '@iconify/icons-ic/round-warning';
import icNeutral from '@iconify/icons-ic/outline-lightbulb';

@Component({
  selector: 'vex-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {

  ic_close = icClose;
  ic_info = icInfo;
  ic_success = icSuccess;
  ic_error = icError;
  ic_warning = icWarn;
  ic_neutral = icNeutral;

  constructor(public snackBarRef: MatSnackBarRef<NotifierComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}

export interface notifierType {
  title?: string,
  msg: string,
  type?: 'error' | 'info' | 'success' | 'warning' | 'neutral',
}