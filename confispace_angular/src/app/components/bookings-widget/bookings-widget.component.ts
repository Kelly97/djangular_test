import { Component, OnInit } from '@angular/core';
import { commonFunctions } from 'src/app/utilities/common-functions';
import moment from "moment";

@Component({
  selector: 'bookings-widget',
  templateUrl: './bookings-widget.component.html',
  styleUrls: ['./bookings-widget.component.scss']
})
export class BookingsWidgetComponent implements OnInit {

  bookingsByDate = [
    {
      date: "2022-06-01",
      bookings: [
        {
          id: 1,
          space: "ZonaFit",
          start_time: "06:00:00",
          end_time: "07:00:00",
        },
        {
          id: 6,
          space: "Sala 1",
          start_time: "06:00:00",
          end_time: "07:00:00",
        },
        {
          id: 2,
          space: "Sala1",
          start_time: "16:00:00",
          end_time: "17:00:00",
        }
      ]
    },
    {
      date: "2022-06-02",
      bookings: [
        {
          id: 5,
          space: "ZonaFit",
          start_time: "06:00:00",
          end_time: "07:00:00",
        }
      ]
    }
  ]

  currentDay = commonFunctions.currentDay();

  moment = moment;

  constructor() { }

  ngOnInit(): void {
  }

}
