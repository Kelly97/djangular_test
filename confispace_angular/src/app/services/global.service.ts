import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NotifyService } from './../components/services/notify.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private notifyService: NotifyService
  ) { }

  valideForm(form: FormGroup) {
    form.markAllAsTouched();
    const valid = form.valid;
    if(!valid)
      this.notifyService.show({
        msg: "Verifique los mensajes de error en el formulario.",
        type: "error"
      });
    return valid;
  }
}
