import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import icAdd from '@iconify/icons-ic/add'
import icCopy from '@iconify/icons-ic/content-copy'
import icHypen from '@iconify/icons-ic/sharp-minus'
import icDelete from '@iconify/icons-ic/sharp-delete-outline'
import icPeople from '@iconify/icons-ic/outline-person'
import icClock from '@iconify/icons-ic/outline-schedule'
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'vex-space-form',
  templateUrl: './space-form.component.html',
  styleUrls: ['./space-form.component.scss'],
  animations: [fadeInUp400ms]
})
export class SpaceFormComponent implements OnInit {

  editMode: boolean = false;
  icAdd = icAdd;
  icCopy = icCopy;
  icHypen = icHypen;
  icDelete = icDelete;
  icPeople = icPeople;
  icClock = icClock;

  constructor(public navigation: NavigationService) { }

  ngOnInit(): void {
  }

}
