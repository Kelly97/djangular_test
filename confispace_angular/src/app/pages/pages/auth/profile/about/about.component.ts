import { Component, OnInit } from '@angular/core';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import icMail from '@iconify/icons-ic/mail-outline';
import icPerson from '@iconify/icons-ic/outline-insert-emoticon';
import icClock from '@iconify/icons-ic/outline-query-builder';
import icCalendar from '@iconify/icons-ic/event';
import icEdit from '@iconify/icons-ic/outline-edit';
import icPassword from '@iconify/icons-ic/outline-password';

@Component({
  selector: 'vex-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class AboutComponent implements OnInit {

  icMail = icMail;
  icPerson = icPerson;
  icClock = icClock;
  icCalendar = icCalendar;
  icEdit = icEdit;
  icPassword = icPassword;

  constructor() { }

  ngOnInit(): void {
  }

}
