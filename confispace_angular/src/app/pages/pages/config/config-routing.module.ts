import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'spaces',
        loadChildren: () => import('./spaces/spaces.module').then(m => m.SpacesModule)
      },
      {
        path: 'holidays',
        loadChildren: () => import('./holidays/holidays.module').then(m => m.HolidaysModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
