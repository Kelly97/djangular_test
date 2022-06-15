import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { SpacesService } from '../../services/spaces.service';
import { forkJoin, Subscription } from 'rxjs';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import moment from 'moment';
import { commonFunctions } from 'src/app/utilities/common-functions';
import { FormControl, FormGroup } from '@angular/forms';
import { group } from 'src/app/components/day-schedules/day-schedules.component';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

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
  groups: group[] = [];

  private subs: Subscription[] = [];

  commonFunctions = commonFunctions;

  schedulesform = new FormGroup({})

  client_validation_messages = {
    generic: [
      { type: "rangeInvalid", message: "No se permiten valores vacíos." },
      { type: "rangeOverlap", message: "Existe un traslape en los horarios ingresados." },
    ],
  }

  server_validation_messages = {};

  constructor(
    public navigation: NavigationService,
    public route: ActivatedRoute,
    private spaceServices: SpacesService,
    private authService: AuthService,
    private globalService: GlobalService) { }

  ngOnInit(): void {
    this.commonFunctions.weekDays.forEach(day => {
      this.schedulesform.addControl(day.day.toString(), new FormControl(day))
    })
    this.getRouteParams();
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }

  getRouteParams() {
    const sub = this.route.parent.params.subscribe(params => {
      this.currentId = params['id'];
      if (this.currentId) {
        this.editMode = true;
        this.getSchedules()
      }
    });
    this.subs.push(sub);
  }

  async getSchedules() {
    const groups: any = await this.authService.groups().toPromise();
    this.groups = groups;
    const schedules: any = await this.spaceServices.getSpaceSchedules(this.currentId).toPromise();
    Object.keys(schedules).forEach((key) => {
      this.schedulesform.get(key).setValue(schedules[key]);
    });
  }

  save() {
    if (this.globalService.valideForm(this.schedulesform)) {
      let schedules = [];
      let val = commonFunctions.deepCopy(this.schedulesform.value);
      Object.keys(val).forEach(key => {
        if (val[key]['ranges']) {
          val[key]['ranges']?.map(range => {
            range.groups = range.groups?.filter(group => group.checked);
          });
          schedules = schedules.concat(val[key]['ranges'])
        }
      })
      let data = {
        space_id: this.currentId,
        schedules: schedules
      }
      console.log(data)
      const sub = this.spaceServices.updateSpaceSchedules(data).subscribe(resp => { }, error => { })
      this.subs.push(sub);
    }
  }

  copySchedule(event) {
    if (event) {
      const dayControl = this.schedulesform.get(event.day.toString()).value;
      this.schedulesform.get(event.day.toString()).setValue({ ...dayControl, ranges: commonFunctions.deepCopy(event.ranges) });
    }
  }
}
