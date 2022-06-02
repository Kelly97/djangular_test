import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import moment from 'moment';
import icArrow from '@iconify/icons-ic/expand-more';
import { commonFunctions } from 'src/app/utilities/common-functions';

@Component({
  selector: 'vex-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class BookingComponent implements OnInit {

  moment = moment;
  commonFunctions = commonFunctions;

  icArrow = icArrow;

  spaces = [
    {
      id: 1,
      name: "ZonaFit",
      interval: 60,
      max_spots: 5,
      time_by_range: false,
      max_booking_days: 30,
      daily_max_bookings: 1,
      weekly_max_bookings: 3,
      schedules: [
        {
          space_id: 1,
          start_time: "06:00:00",
          end_time: "07:00:00",
          count: 0
        },
        {
          space_id: 1,
          start_time: "13:00:00",
          end_time: "14:00:00",
          count: 2
        },
        {
          space_id: 1,
          start_time: "17:00:00",
          end_time: "18:00:00",
          count: 5
        },
      ]
    },
    {
      id: 2,
      name: "Sala 1",
      interval: 30,
      max_spots: 1,
      time_by_range: true,
      max_booking_days: 30,
      daily_max_bookings: null,
      weekly_max_bookings: null
    }
  ]

  currentSpace;

  form = new FormGroup({
    date: new FormControl(moment(), Validators.required),
    start_time: new FormControl([], Validators.required),
  })

  constructor() { }

  ngOnInit(): void {
    this.changeSpace(2);
  }

  changeSpace(id: number) {
    this.currentSpace = this.spaces.find(el => el.id == id);
  }

  toogleSchedule(event) {
    let currentTimes: any[] = this.form.value.start_time;
    if (event.target.checked) {
      currentTimes.push(event.target.value);
    }
    else {
      currentTimes = currentTimes.filter(function (ele) {
        return ele != event.target.value;
      });
    }
    this.form.get("start_time").setValue(currentTimes)
    console.log(this.form.value.start_time)
  }

  dateFilter(date: Date): boolean {
    console.log(date)
    return true;
  }
}
