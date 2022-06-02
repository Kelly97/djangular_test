import { Component, OnInit } from '@angular/core';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icAdd from '@iconify/icons-ic/twotone-add';
import moment from "moment";
import { popoverAnimation } from 'src/@vex/animations/popover.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { commonFunctions } from 'src/app/utilities/common-functions';
import { Router } from '@angular/router';

@Component({
  selector: 'bookings-widget',
  templateUrl: './bookings-widget.component.html',
  styleUrls: ['./bookings-widget.component.scss'],
  animations: [popoverAnimation, fadeInUp400ms, fadeInRight400ms,]
})
export class BookingsWidgetComponent implements OnInit {

  icFilterList = icFilterList;
  icAdd = icAdd;

  moment = moment;

  bookingsByDate = [
    {
      date: "2022-06-02",
      bookings: [
        {
          id: 5,
          space: "ZonaFit",
          start_time: "06:00:00",
          end_time: "07:00:00",
        },
        {
          id: 9,
          space: "ZonaFit",
          start_time: "08:00:00",
          end_time: "10:00:00",
        }
      ]
    },
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
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createReserve() {
    this.router.navigate(["/booking"]);
  }

}
