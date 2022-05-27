import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import icDots from '@iconify/icons-ic/more-vert'
import icRoom from '@iconify/icons-ic/room'
import icEdit from '@iconify/icons-ic/outline-edit'
import icEnable from '@iconify/icons-ic/round-check-circle-outline'
import icDisable from '@iconify/icons-ic/remove-circle-outline'
import icAdd from '@iconify/icons-ic/round-add-circle-outline'
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

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

  spaces = [
    {
      id: 1,
      name: 'ZonaFit',
      description: 'Espacio para entrenamiento físico.',
      is_active: true,
      capacity: 5
    }
  ]

  constructor(public navigation: NavigationService, public route: ActivatedRoute) { }

  ngOnInit(): void { }
}
