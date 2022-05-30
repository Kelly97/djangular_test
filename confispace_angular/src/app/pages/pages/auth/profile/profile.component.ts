import { Component, OnInit } from '@angular/core';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { Link } from 'src/@vex/interfaces/link.interface';
import { StorageService } from 'src/app/services/storage.service';
import icPerson from '@iconify/icons-ic/twotone-person';

@Component({
  selector: 'vex-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class ProfileComponent implements OnInit {

  icPerson = icPerson;
  links: Link[] = [
    {
      label: 'ACERCA',
      route: '/profile/about',
    }
  ];

  constructor(public storage: StorageService) { }

  ngOnInit(): void {
  }

}
