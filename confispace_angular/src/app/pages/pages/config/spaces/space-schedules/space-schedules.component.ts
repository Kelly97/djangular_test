import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { SpacesService } from '../../services/spaces.service';
import { Subscription } from 'rxjs';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import moment from 'moment';
import { commonFunctions } from 'src/app/utilities/common-functions';

@Component({
  selector: 'vex-space-schedules',
  templateUrl: './space-schedules.component.html',
  styleUrls: ['./space-schedules.component.scss'],
  animations: [fadeInUp400ms]
})
export class SpaceSchedulesComponent implements OnInit, OnDestroy {

  

  editMode: boolean = false;
  currentId: number;
  originalRecord: any;

  private routeSub: Subscription;

  constructor(public navigation: NavigationService, private route: ActivatedRoute, private spaceServices: SpacesService) { }

  ngOnInit(): void {
    this.routeSub = this.route.parent.params.subscribe(params => {
      this.currentId = params['id'];
      if (this.currentId) {
        this.editMode = true;
        //this.getInfo()
      }
    });
  }


  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
