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
      data: data,
      duration: data.msg.toString().length * 150 || 120000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['bg-' + data.type + '-50', 'text-' + data.type + '-700', 'text-black', 'w-screen', 'max-w-lg', 'rounded-xl']
    });
  }
}
