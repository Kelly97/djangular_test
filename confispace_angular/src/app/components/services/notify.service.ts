import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent, notifierType } from '../notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private snackbar: MatSnackBar) { }

  show(data: notifierType) {
    this.snackbar.openFromComponent(NotifierComponent, {
      data: {
        msg: data.msg
      },
      duration: 10000000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: data.type || 'bg-green'
    });
  }
}
