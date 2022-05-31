import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { AboutComponent } from './about/about.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserFormComponent } from './about/user-form/user-form.component';
import { ChangePasswordComponent } from './about/change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ProfileComponent,
    AboutComponent,
    UserFormComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    MatTabsModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule
  ]
})
export class ProfileModule { }
