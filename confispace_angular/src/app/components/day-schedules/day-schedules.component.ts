import { Component, OnInit } from '@angular/core';
import icAdd from '@iconify/icons-ic/add'
import icCopy from '@iconify/icons-ic/content-copy'
import icHypen from '@iconify/icons-ic/sharp-minus'
import icDelete from '@iconify/icons-ic/sharp-delete-outline'
import icPeople from '@iconify/icons-ic/round-group'
import icClock from '@iconify/icons-ic/outline-schedule'
import { commonFunctions } from 'src/app/utilities/common-functions';

@Component({
  selector: 'day-schedules',
  templateUrl: './day-schedules.component.html',
  styleUrls: ['./day-schedules.component.scss']
})
export class DaySchedulesComponent implements OnInit {

  icAdd = icAdd;
  icCopy = icCopy;
  icHypen = icHypen;
  icDelete = icDelete;
  icPeople = icPeople;
  icClock = icClock;

  commonFunctions = commonFunctions;

  constructor() { }

  ngOnInit(): void {
  }

}
