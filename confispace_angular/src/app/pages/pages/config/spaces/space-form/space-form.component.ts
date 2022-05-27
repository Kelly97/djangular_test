import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import icAdd from '@iconify/icons-ic/add'
import icCopy from '@iconify/icons-ic/content-copy'
import icHypen from '@iconify/icons-ic/sharp-minus'
import icDelete from '@iconify/icons-ic/sharp-delete-outline'
import icPeople from '@iconify/icons-ic/outline-person'
import icClock from '@iconify/icons-ic/outline-schedule'
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

  private routeSub: Subscription;

  icAdd = icAdd;
  icCopy = icCopy;
  icHypen = icHypen;
  icDelete = icDelete;
  icPeople = icPeople;
  icClock = icClock;

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
      is_active: new FormControl("", [
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
      time_by_range: new FormControl("", [
        Validators.required
      ]),
      capacity: new FormControl("", [
        Validators.required
      ])
    }
  );

  constructor(public navigation: NavigationService, private route: ActivatedRoute, private spaceServices: SpacesService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.currentId = params['id'];
      if (this.currentId) {
        this.getInfo()
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  create() { }

  edit() { }

  getInfo() {
    this.spaceServices.getSpace(this.currentId).subscribe((resp: any) => {
      console.log(resp)
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].setValue(resp[key]);
      });
    })
  }


}
