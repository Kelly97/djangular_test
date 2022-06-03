import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { Link } from 'src/@vex/interfaces/link.interface';

@Component({
  selector: 'vex-space-details',
  templateUrl: './space-details.component.html',
  styleUrls: ['./space-details.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class SpaceDetailsComponent implements OnInit, OnDestroy {

  links: Link[] = [
    {
      label: 'General',
      route: './general',
    },
    {
      label: 'Horarios',
      route: './schedules',
    }
  ];

  private routeSub: Subscription;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
      }
    });
  }


  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
