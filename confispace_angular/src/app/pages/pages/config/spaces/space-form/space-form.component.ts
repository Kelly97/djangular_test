import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { Subscription } from 'rxjs';
import { SpacesService } from '../../services/spaces.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vex-space-form',
  templateUrl: './space-form.component.html',
  styleUrls: ['./space-form.component.scss'],
  animations: [fadeInUp400ms]
})
export class SpaceFormComponent implements OnInit, OnDestroy {

  editMode: boolean = false;
  currentId: number;
  originalRecord: any;

  private subs: Subscription[] = [];

  form = new FormGroup(
    {
      id: new FormControl({ value: "", disabled: true }),
      name: new FormControl("", [
        Validators.required
      ]),
      description: new FormControl("", [
        Validators.required
      ]),
      max_spots: new FormControl("", [
        Validators.required
      ]),
      is_active: new FormControl(true, [
        Validators.required
      ]),
      increments: new FormControl("", [
        Validators.required
      ]),
      max_booking_days: new FormControl("", [
        Validators.required
      ]),
      daily_max_bookings: new FormControl("", [
        Validators.required
      ]),
      weekly_max_bookings: new FormControl("", [
        Validators.required
      ]),
      time_by_range: new FormControl(false, [
        Validators.required
      ]),
      capacity: new FormControl("", [
        Validators.required
      ])
    }
  );

  client_validation_messages = {
    /* first_name: [
      { type: "required", message: "El campo es requerido." },
      { type: "onlyChar", message: "Solo se admiten letras y espacios." },
    ],
    last_name: [
      { type: "required", message: "El campo es requerido." },
      { type: "onlyChar", message: "Solo se admiten letras y espacios." },
    ], */
  };

  server_validation_messages = {};

  helpText: any = {
    increments: "Intervalo de tiempo mínimo (minutos) que podrá ser reservado.",
    capacity: "Cantidad solamente informativa de la capacidad de asistentes de la sala.",
    daily_max_bookings: "Cantidad máxima de reservas que el usuario puede crear en el día.",
    weekly_max_bookings: "Cantidad máxima de reservas que el usuario puede crear en la semana.",
    max_booking_days: "Cantidad máxima de días que serán habilitados en el calendario para crear reservas.",
    max_spots: "Número máximo de reservas simultáneas permitidas en un intérvalo de tiempo.",
    is_active: "Indicador para mostrar u ocultar el espacio en el calendario de reservas."
  }

  constructor(
    public navigation: NavigationService,
    public route: ActivatedRoute,
    private spaceServices: SpacesService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getRouteParams();
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }


  getRouteParams() {
    const sub = this.route.parent.params.subscribe(params => {
      this.currentId = params['id'];
      if (this.currentId) {
        this.editMode = true;
        this.getInfo()
      }
    });
    this.subs.push(sub);
  }

  getInfo() {
    const sub = this.spaceServices.getSpace(this.currentId).subscribe((resp: any) => {
      this.originalRecord = resp;
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].setValue(resp[key]);
      });
    });
    this.subs.push(sub);
  }

  save() {
    if (this.currentId) this.edit();
    else this.create();
  }

  create() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const sub = this.spaceServices.createSpace(this.form.getRawValue()).subscribe(
        (resp: any) => {
          console.log(resp)
          this.router.navigate(['config', 'spaces', 'edit', resp.id, 'general'])
        },
        error => {
          this.server_validation_messages = error
        });
      this.subs.push(sub);
    }
  }

  edit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const sub = this.spaceServices.updateSpace(this.currentId, this.form.getRawValue()).subscribe(
        (resp: any) => {
          this.originalRecord = resp;
        },
        error => {
          this.server_validation_messages = error
        });
      this.subs.push(sub);
    }
  }


}
