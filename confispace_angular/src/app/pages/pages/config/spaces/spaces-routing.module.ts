import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpaceDetailsComponent } from './space-details/space-details.component';
import { SpaceFormComponent } from './space-form/space-form.component';
import { SpaceSchedulesComponent } from './space-schedules/space-schedules.component';
import { SpacesComponent } from './spaces.component';

const routes: Routes = [
  { path: "", component: SpacesComponent },
  {
    path: 'edit/:id', component: SpaceDetailsComponent,
    children: [
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full',
      },
      { path: 'general', component: SpaceFormComponent },
      { path: 'schedules', component: SpaceSchedulesComponent },
    ]
  },
  {
    path: 'create', component: SpaceDetailsComponent,
    children: [
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full',
      },
      { path: 'general', component: SpaceFormComponent },
      { path: 'schedules', component: SpaceSchedulesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpacesRoutingModule { }
