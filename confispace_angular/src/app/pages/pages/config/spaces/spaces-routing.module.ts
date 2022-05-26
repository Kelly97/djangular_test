import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpaceFormComponent } from './space-form/space-form.component';
import { SpacesComponent } from './spaces.component';

const routes: Routes = [
  { path: "", component: SpacesComponent },
  { path: 'edit/:id', component: SpaceFormComponent },
  { path: 'create', component: SpaceFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpacesRoutingModule { }
