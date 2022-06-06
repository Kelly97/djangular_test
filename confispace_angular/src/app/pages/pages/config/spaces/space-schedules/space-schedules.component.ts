import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { SpacesService } from '../../services/spaces.service';
import { Subscription } from 'rxjs';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import moment from 'moment';
import { commonFunctions } from 'src/app/utilities/common-functions';
import { FormControl, FormGroup } from '@angular/forms';
import { group } from 'src/app/components/day-schedules/day-schedules.component';

@Component({
  selector: 'vex-space-schedules',
  templateUrl: './space-schedules.component.html',
  styleUrls: ['./space-schedules.component.scss'],
  animations: [fadeInUp400ms]
})
export class SpaceSchedulesComponent implements OnInit, OnDestroy {



  editMode: boolean = false;
  currentId: number;
  originalRecord: any;
  groups: group[] = [
    { id: 1, name: "Mujeres" },
    { id: 2, name: "Hombres" }
  ];

  private routeSub: Subscription;

  commonFunctions = commonFunctions;

  schedulesform = new FormGroup({})

  client_validation_messages = {
    generic: [
      { type: "rangeInvalid", message: "El formato es de 24 horas (HH:mm), no se permiten valores vacíos." },
      { type: "rangeOverlap", message: "Existe un traslape en los horarios ingresados." },
    ],
  }

  server_validation_messages = {};

  constructor(public navigation: NavigationService, public route: ActivatedRoute, private spaceServices: SpacesService) { }

  ngOnInit(): void {
    this.commonFunctions.weekDays.forEach(day => {
      this.schedulesform.addControl(day.day.toString(), new FormControl(day))
    })
    this.routeSub = this.route.parent.params.subscribe(params => {
      this.currentId = params['id'];
      if (this.currentId) {
        this.editMode = true;
        //this.getInfo()
        this.schedulesform.get('1').setValue({
          day: 1,
          label: "Lunes",
          ranges: [
            {
              id: 1,
              start_time: "06:00:00",
              end_time: "09:00:00",
              groups: []
            },
            {
              id: 2,
              start_time: "17:00:00",
              end_time: "19:00:00",
              groups: [
                {
                  id: 1,
                  name: "Mujeres"
                },
                {
                  id: 1,
                  name: "Hombres"
                }
              ]
            }
          ]
        })
        this.schedulesform.get('2').setValue({
          day: 2,
          label: "Martes",
        })
      }
    });
  }


  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  save() {
    this.schedulesform.markAllAsTouched()
    console.log(this.schedulesform.value)
  }

  copySchedule(event) {
    if (event) {
      event.days.forEach(day => {
        const dayControl = this.schedulesform.get(day.toString()).value;
        this.schedulesform.get(day.toString()).setValue({ ...dayControl, ranges: JSON.parse(JSON.stringify(event.ranges)) });
      });
    }
  }
}
