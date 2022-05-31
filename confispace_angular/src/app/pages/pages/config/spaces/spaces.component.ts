import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';

import icDots from '@iconify/icons-ic/more-vert'
import icRoom from '@iconify/icons-ic/room'
import icEdit from '@iconify/icons-ic/outline-edit'
import icEnable from '@iconify/icons-ic/round-check-circle-outline'
import icDisable from '@iconify/icons-ic/remove-circle-outline'
import icAdd from '@iconify/icons-ic/round-add-circle-outline'
import icDelete from '@iconify/icons-ic/twotone-delete';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { SpacesService } from '../services/spaces.service';

@Component({
  selector: 'vex-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss'],
  animations: [fadeInUp400ms]
})
export class SpacesComponent implements OnInit {

  icDots = icDots;
  icRoom = icRoom;
  icEdit = icEdit;
  icEnable = icEnable;
  icDisable = icDisable;
  icAdd = icAdd;
  icDelete = icDelete;

  spaces = []

  constructor(public navigation: NavigationService, public route: ActivatedRoute, private spaceServices: SpacesService) { }

  ngOnInit(): void {
    this.getSpaces();
  }

  getSpaces() {
    this.spaceServices.getSpacesGeneral().subscribe((resp: any) => {
      this.spaces = resp;
    })
  }

  disable() { }
}
