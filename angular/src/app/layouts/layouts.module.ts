import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { InternalErrorComponent } from './internal-error/internal-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [   
    LoginComponent,
    NotFoundComponent,
    AccessDeniedComponent,
    InternalErrorComponent,
    DashboardComponent    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class LayoutsModule { }
