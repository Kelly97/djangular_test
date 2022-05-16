import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { InternalErrorComponent } from './internal-error/internal-error.component';



@NgModule({
  declarations: [   
    LoginComponent,
    NotFoundComponent,
    AccessDeniedComponent,
    InternalErrorComponent    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutsRoutingModule
  ]
})
export class LayoutsModule { }
