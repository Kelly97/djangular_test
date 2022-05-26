import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import icDots from '@iconify/icons-ic/more-vert'
import icRoom from '@iconify/icons-ic/room'
import icEdit from '@iconify/icons-ic/outline-edit'
import icEnable from '@iconify/icons-ic/round-check-circle-outline'
import icDisable from '@iconify/icons-ic/remove-circle-outline'
import icAdd from '@iconify/icons-ic/round-add-circle-outline'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'vex-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss'],
  animations: [fadeInUp400ms]
})
export class SpacesComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  icDots = icDots;
  icRoom = icRoom;
  icEdit = icEdit;
  icEnable = icEnable;
  icDisable = icDisable;
  icAdd = icAdd;

  ngOnInit(): void {
  }

  newSpace() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
