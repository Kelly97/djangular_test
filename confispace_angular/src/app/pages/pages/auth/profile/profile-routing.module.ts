import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [
    {
      path: '',
      redirectTo: 'about',
      pathMatch: 'full',
    },
    {
      path: 'about',
      component: AboutComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
